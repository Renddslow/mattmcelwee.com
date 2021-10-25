import { toHast } from 'mdast-util-to-hast';
import { visit } from 'unist-util-visit';

import slugID from './slugID.js';

const toHTML =
  (options = {}) =>
  (tree) =>
    toHast(tree, {
      handlers: {
        link: (h, node) => {
          if (node.url === '!W') {
            let wikiLink = node.title;
            visit(node, 'text', ({ value }) => {
              wikiLink = wikiLink || value;
            });
            return {
              type: 'element',
              tagName: 'a',
              properties: {
                title: node.title,
                href: `https://en.wikipedia.org/wiki/${wikiLink.replace(/\s+/g, '_')}`,
              },
              children: toHast(node).children,
            };
          } else {
            return toHast(node);
          }
        },
        heading: (h, node) => {
          let title = '';
          visit(node, 'text', ({ value }) => {
            title = value;
          });
          const element = toHast(node);
          element.properties = Object.assign({}, element.properties, {
            id: slugID(title),
          });
          return element;
        },
      },
      unknownHandler: (h, node) => {
        if (node.type === 'element') return node;
      },
    });

export default toHTML;
