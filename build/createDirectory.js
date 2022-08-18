const createDirectory = (files) => {
  return `<ul class="directory">${files
    .sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    })
    .map((f) => {
      return `<li><a href="${f.relPermalink}">${f.title}</a></li>`;
    })
    .join('\n')}</ul>`;
};

export default createDirectory;
