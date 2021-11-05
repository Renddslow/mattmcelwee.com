import titleize from 'titleize';
import { get } from 'dot-prop';

import WEIGHTS from './weights.js';

const findSectionTitleOrTitleize = (relPermalink, files) => {
  const sectionIndex = files.find((f) => f.relPermalink === `${relPermalink}/`);
  if (sectionIndex) {
    return {
      title: sectionIndex.title,
      relPermalink,
      children: [],
    };
  }
  const cleanedSlug = relPermalink.replace(/^\//, '').replace(/\/$/, '').split('/').slice(-1)[0];
  return {
    title: titleize(cleanedSlug.replace(/[-_]/, ' ')),
    relPermalink,
    children: [],
  };
};

const dedupe = (list) =>
  Object.keys(
    list.reduce((acc, item) => {
      acc[item] = true;
      return acc;
    }, {}),
  );

const createSection = ({ title, relPermalink }) => {
  return relPermalink === '/'
    ? `<h2 class="directory-section">${title}</h2>`
    : `<h2 class="directory-section"><a href="${relPermalink}">${title}</a></h2>`;
};

const sortByDate = (list) => {
  return list.sort((a, b) => {
    if (get(a, 'lastTended.when', a.created) > get(b, 'lastTended.when', b.created)) return 1;
    if (get(a, 'lastTended.when', a.created) < get(b, 'lastTended.when', b.created)) return -1;
    return 0;
  });
};

const findIndex = (weights, title) => weights.findIndex((w) => w === title);

const sortByWeight = (list) => {
  return list.sort((a, b) => {
    if (findIndex(WEIGHTS, a.title) > findIndex(WEIGHTS, b.title)) return 1;
    if (findIndex(WEIGHTS, a.title) < findIndex(WEIGHTS, b.title)) return -1;
    return 0;
  });
};

const createIndexPage = (files) => {
  const sectionPerms = dedupe(files.map((f) => f.section.replace(/\/$/, '')));
  const sections = [
    ...sectionPerms.filter((s) => s !== '/').map((link) => findSectionTitleOrTitleize(link, files)),
    {
      title: 'Miscellaneous/General',
      relPermalink: '/',
      children: [],
    },
  ];

  sections.forEach((section, idx) => {
    sections[idx].children.push(
      ...files.filter((f) => f.section === section.relPermalink).filter((f) => !f.isDirectory),
    );
  });

  return sortByWeight(sections)
    .filter((section) => section.children.length > 0)
    .map((section) => {
      const sectionTitle = createSection(section);
      const list = `<ul class="directory">${sortByDate(section.children)
        .map((c) => `<li><a href="${c.relPermalink}">${c.title}</a></li>`)
        .join('\n')}</ul>`;
      return `${sectionTitle}\n${list}`;
    })
    .join('\n');
};

export default createIndexPage;
