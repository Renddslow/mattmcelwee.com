import { toHast } from 'mdast-util-to-hast';
import { visit } from 'unist-util-visit';

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
      },
    });

export default toHTML;
