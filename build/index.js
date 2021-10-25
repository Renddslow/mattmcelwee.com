import fs from 'fs';
import path from 'path';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { parse } from '@saibotsivad/blockdown';
import yaml from 'yaml';

import rehypeStringify from 'rehype-stringify';

// mattmcelwee.com plugins
import toHTML from './toHTML.js';
// import TOC from './makeTOC.js';

const make = async () => {
  const file = fs.readFileSync(path.join(process.cwd(), 'content/_index.md')).toString();

  const blocks = await Promise.all(
    parse(file.replace(/<!--(.|\n)*-->/g, ''))
      .blocks.filter(({ content }) => !!content)
      .map(async (block) => {
        if (block.name === 'frontmatter') {
          block.content = yaml.parse(block.content);
        } else {
          block.content = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(toHTML)
            .use(rehypeStringify)
            .process(block.content);
        }
        return block;
      }),
  );

  const htmlBody = blocks
    .map(({ name, content }) => {
      if (name === 'markdown') return content.value;
      return `<div class="${name}">${content.value}</div>`;
    })
    .join('\n');

  console.log(htmlBody);
};

make();
