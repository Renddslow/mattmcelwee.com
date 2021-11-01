import sass from 'node-sass';
import path from 'path';

const compileInlineStyles = () =>
  new Promise((resolve, rej) => {
    sass.render(
      {
        file: path.join(process.cwd(), 'sass/inline', 'main.scss'),
      },
      (err, res) => {
        if (err) {
          return rej(err);
        }
        return resolve(`<style>${res.css.toString()}</style>`);
      },
    );
  });

export default compileInlineStyles;
