import { globby } from 'globby';
import fs from 'fs/promises';
import path from 'path';
import sortOn from 'sort-on';
import * as handlebars from 'handlebars';

import processFile from './processFile.js';

/** ts
type Entry = {
  id: string;
  params: {
    author: string;
    authorCitation: string;
    year: number;
    publisher: string;
  };
  links: {
    amazon: string;
    publisher: string;
    audible: string;
  };
};
 */

const hash = (str) => {
  let hashVal;
  let chr;
  let len;
  let i;

  if (str.length === 0) return hashVal;

  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hashVal = (hashVal << 5) - hashVal + chr;
    hashVal |= 0; // Convert to 32bit integer
  }

  return Math.abs(hashVal).toString(16);
};

const makeBibliography = async () => {
  const files = await Promise.all(
    (
      await globby('bibliography/*.md')
    ).map(async (p) => (await fs.readFile(path.join(process.cwd(), p))).toString()),
  );
  const j = await Promise.all(
    files.map((f) =>
      processFile({
        rawContent: f,
      }),
    ),
  );
  const template = handlebars.default.compile(
    (await fs.readFile(path.join(process.cwd(), 'layouts', 'bibliography.hbs'))).toString(),
  );
  const entries = sortOn(j, ['authorCitation', 'year']).map((e) => ({
    ...e,
    id: hash(`${e.title}-${e.authorCitation}`),
  }));
  return template({
    entries,
  });
};

export default makeBibliography;
