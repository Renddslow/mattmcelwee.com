import fs from 'fs';
import path from 'path';

import { globby } from 'globby';
import { get } from 'dot-prop';
import * as handlebars from 'handlebars';

import diff from './diff.js';
import processFile from './processFile.js';

const noDiff = process.argv.includes('--no-diff');

// TODO: "atomic" builds
(async () => {
  // TODO: read data/ into memory
  const diffedFiles = diff();
  const filesToProcess = (
    !noDiff && diffedFiles && diffedFiles.length ? diffedFiles : await globby('content/**/*')
  ).map((p) => ({
    filepath: p,
    name: '',
    rawContent: fs.readFileSync(path.join(process.cwd(), p)).toString(),
  }));

  const template = handlebars.default.compile(
    fs.readFileSync(path.join(process.cwd(), 'layouts', 'default.hbs')).toString(),
  );

  const filesToRender = await Promise.all(
    filesToProcess.map(async (f) => {
      const { content, ...params } = await processFile(f);
      return {
        ...f,
        content,
        title: params.title,
        tagsStr: (params.tags || []).join(', '),
        params: {
          ...params,
          author: get(params, 'lastTended.by') || params.originalAuthor || 'Matt McElwee',
          content,
        },
      };
    }),
  );

  filesToRender.forEach((f) => {
    console.log(template(f));
  });
})();
