import fs from 'fs';
import path from 'path';

import { globby } from 'globby';
import { get } from 'dot-prop';
import * as handlebars from 'handlebars';
import marked from 'marked';

import diff from './diff.js';
import processFile from './processFile.js';
import createPath from './createPath.js';
import getDataObject from './getDataObject.js';

const noDiff = process.argv.includes('--no-diff');

handlebars.default.registerHelper('eq', (a, b) => a === b);
handlebars.default.registerHelper('neq', (a, b) => a !== b);
handlebars.default.registerHelper('markdownify', (a) => marked(a));

(async () => {
  const data = await getDataObject();
  const diffedFiles = diff();
  const filesToProcess = (
    !noDiff && diffedFiles && diffedFiles.length ? diffedFiles : await globby('content/**/*')
  ).map((p) => ({
    filepath: p,
    name: path.basename(p, '.md'),
    rawContent: fs.readFileSync(path.join(process.cwd(), p)).toString(),
  }));

  const template = handlebars.default.compile(
    fs.readFileSync(path.join(process.cwd(), 'layouts', 'default.hbs')).toString(),
  );

  const filesToRender = await Promise.all(
    filesToProcess.map(async (f) => {
      const { content, ...params } = await processFile(f);
      const author = get(params, 'lastTended.by') || params.originalAuthor || 'Matt McElwee';
      return {
        ...f,
        data,
        content,
        isHome: f.filepath === 'content/_index.md',
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

  // 1. Process files ✅
  // 2. Get url
  // 3. Make directory for URL
  // 4. Place file
  // 5. Scan + Compare content/ with public/
  // 6. Scan + Compare static/ with public/
  // 7. Remove excess files from public/

  filesToRender.forEach((f) => {
    const html = template(f);
    console.log(html);
  });
})();
