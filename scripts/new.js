import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import titleize from 'titleize';
import makeDir from 'make-dir';

const tryFile = (p) => {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'archetypes', p)).toString();
  } catch (e) {
    return null;
  }
};

const processPathForTries = (dir) => {
  const segments = dir.split(/\//);
  return [
    ...segments
      .reduce((acc, p, idx) => {
        const segmentPath = segments.slice(0, idx).join('/');
        const pathWithoutExt = `${segmentPath ? `${segmentPath}/` : ''}${p}`;
        acc.push(`${pathWithoutExt}.hbs`);
        acc.push(`${pathWithoutExt}/_index.hbs`);
        return acc;
      }, [])
      .reverse(),
    'default.hbs',
  ];
};

const tryFiles = (paths) => {
  let result = null;
  let idx = 0;
  do {
    result = tryFile(paths[idx]);
    idx++;
  } while (result === null && idx < paths.length);
  return result;
};

(() => {
  const paths = process.argv.slice(2);
  paths.forEach((p) => {
    const dir = path.dirname(p);
    const templatePaths = dir === '.' ? ['default.hbs'] : processPathForTries(dir); // process path for tries
    const template = handlebars.default.compile(tryFiles(templatePaths));

    const fileName = path.basename(p, '.md');
    const inferredTitle = titleize(fileName.replace(/[-_]/g, ' '));

    const md = template({
      inferredTitle,
      date: new Date().toISOString().split('T')[0],
    });

    makeDir.sync(path.join(process.cwd(), 'content', dir));
    fs.writeFileSync(path.join(process.cwd(), 'content', p), md);
  });
})();
