const createPath = (filePath) => {
  const contentReplaceRegexpr = /^content/;
  return filePath
    .replace(contentReplaceRegexpr, '')
    .replace(/\.md$/, '')
    .replace(/_index/, '');
};

export default createPath;
