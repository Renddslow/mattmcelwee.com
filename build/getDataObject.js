import { globby } from 'globby';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const read = (filepath) => fs.readFileSync(path.join(process.cwd(), filepath)).toString();

const readJSON = (filepath) => {
  return JSON.parse(read(filepath));
};
const readYAML = (filepath) => {
  return yaml.parse(read(filepath));
};
const getName = (fp) => path.basename(fp, path.extname(fp));

const getDataObject = async () => {
  const files = await globby('data/*');
  return files
    .map((filepath) => {
      switch (path.extname(filepath)) {
        case '.json':
          return {
            content: readJSON(filepath),
            name: getName(filepath),
          };
        case '.yaml':
        case '.yml':
          return {
            content: readYAML(filepath),
            name: getName(filepath),
          };
      }
    })
    .reduce((acc, d) => {
      acc[d.name] = d.content;
      return acc;
    }, {});
};

export default getDataObject;
