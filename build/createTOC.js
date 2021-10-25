import { visit } from 'unist-util-visit';

import slugID from './slugID.js';

const li = (title) => {
  const id = slugID(title);
  return {
    type: 'element',
    tagName: 'li',
    children: [
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href: `#${id}`,
        },
        children: [
          {
            type: 'text',
            value: title,
          },
        ],
      },
    ],
  };
};

const createTOC = () => (tree) => {
  const toc = {
    type: 'element',
    tagName: 'div',
    properties: {
      className: ['table-of-contents'],
    },
    children: [],
  };

  const parentUl = {
    type: 'element',
    tagName: 'ul',
    children: [],
  };

  visit(tree, 'heading', (node) => {
    if (node.depth === 2) {
      visit(node, 'text', ({ value }) => {
        parentUl.children.push(li(value));
      });
    }
  });

  toc.children.push(parentUl);

  tree.children = [toc, ...tree.children];
};

export default createTOC;
