const createPath = (filePath) => {
  const contentReplaceRegexpr = /^content/;
  return filePath
    .replace(contentReplaceRegexpr, '')
    .replace(/\.md$/, '')
    .replace(/_index/, '/')
    .replace(/\/\//, '/');
};

export default createPath;
