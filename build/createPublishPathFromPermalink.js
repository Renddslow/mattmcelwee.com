// content/_index.md => public/index.html
// content/language/_index.md => public/language/index.html
// content/language/pharisees.md => public/language/pharisees/index.html
const createPublishPathFromPermalink = (permalink) => {
  const contentPath = permalink.endsWith('/')
    ? `${permalink}index.html`
    : `${permalink}/index.html`;
  return `public${contentPath}`;
};

export default createPublishPathFromPermalink;
