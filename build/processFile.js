import { parse } from '@saibotsivad/blockdown';
import yaml from 'yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';

import createTOC from './createTOC.js';
import toHTML from './toHTML.js';

const make = async ({ rawContent: file }) => {
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
            .use(createTOC)
            .use(toHTML)
            .use(rehypeStringify, {
              allowDangerousHtml: true,
            })
            .process(block.content);
        }
        return block;
      }),
  );

  const fm = blocks[0].name === 'frontmatter' ? blocks[0].content : {};
  const htmlBody = blocks
    .filter(({ name }) => name !== 'frontmatter')
    .map(({ name, content }) => {
      if (name === 'markdown') return content.value;
      return `<div class="${name}">${content.value}</div>`;
    })
    .join('\n');

  return {
    ...fm,
    content: htmlBody,
  };
};

export default make;
