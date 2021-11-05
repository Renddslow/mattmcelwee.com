import fs from 'fs';
import path from 'path';

import { globby } from 'globby';
import { get } from 'dot-prop';
import * as handlebars from 'handlebars';
import marked from 'marked';
import mkdir from 'make-dir';
import { format } from 'date-fns';
import cpy from 'cpy';

import processFile from './processFile.js';
import createPath from './createPath.js';
import getDataObject from './getDataObject.js';
import createPublishPathFromPermalink from './createPublishPathFromPermalink.js';
import compileInlineStyles from './compileInlineStyles.js';
import createIndexPage from './createIndexPage.js';

const TAB = '    ';

handlebars.default.registerHelper('eq', (a, b) => a === b);
handlebars.default.registerHelper('neq', (a, b) => a !== b);
handlebars.default.registerHelper('markdownify', (a) => marked(a));
handlebars.default.registerHelper('get', (o, k) => get(o, k));
handlebars.default.registerHelper('call', (cb, ...args) => {
  return cb(...args);
});
handlebars.default.registerHelper('linkify', (page) => {
  return `<a href="${page.relPermalink}">${page.title}</a>`;
});
handlebars.default.registerHelper('format', (str, fmt) => {
  const d = new Date(str);
  return format(d, fmt);
});

// TODO: make fs interaction async
(async () => {
  const data = await getDataObject();
  const filesToProcess = (await globby('content/**/*')).map((p) => ({
    filepath: p,
    name: path.basename(p, '.md'),
    rawContent: fs.readFileSync(path.join(process.cwd(), p)).toString(),
  }));

  const template = handlebars.default.compile(
    fs.readFileSync(path.join(process.cwd(), 'layouts', 'default.hbs')).toString(),
  );

  const inlineCSS = await compileInlineStyles();
  /** TODO: compile linked styles
   *  - glob sass/ ** /main.scss
   *  - filter out `inline`
   *  - create *.css files with the originating dirname as the filename
   *  - create links
   */

  const filesToRender = await Promise.all(
    filesToProcess.map(async (f) => {
      const { content, ...params } = await processFile(f);
      const author = get(params, 'lastTended.by') || params.originalAuthor || 'Matt McElwee';
      return {
        ...f,
        site: {
          data,
        },
        inlineCSS,
        content,
        isHome: f.filepath === 'content/_index.md',
        isDirectory: f.filepath.includes('_index.md'),
        section: f.filepath.includes('_index.md')
          ? createPath(f.filepath)
          : path.dirname(createPath(f.filepath)),
        relPermalink: createPath(f.filepath),
        title: params.title,
        tagsStr: (params.tags || []).join(', '),
        thumbnailAlt: `Pre-generated thumbnail for the essay with the title "${params.title}" in bold face font.`,
        params: {
          ...params,
          author,
          content,
        },
      };
    }),
  );

  // TODO - #1: figure out caching + incremental builds

  const getPage = (permalink) => {
    const page = filesToRender.find(({ relPermalink }) => relPermalink === permalink);
    return page || {};
  };

  await Promise.all(
    filesToRender.map(async (f) => {
      if (f.relPermalink === '/') {
        f.content += createIndexPage(filesToRender);
      }

      const html = template({
        ...f,
        $: {
          getPage,
        },
      });

      const filepath = createPublishPathFromPermalink(f.relPermalink);
      await mkdir(path.dirname(filepath));
      fs.writeFileSync(path.join(process.cwd(), filepath), html);
    }),
  );

  console.log(TAB + `Copying files from static/ to public/`);
  await cpy('**/*', '../public', {
    parents: true,
    cwd: path.join(process.cwd(), 'static'),
  });
})();
