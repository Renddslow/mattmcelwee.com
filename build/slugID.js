import slugify from 'slugify';

const slugID = (title) => slugify(title, { remove: /[*+~.()'"!:@]/g, lower: true });

export default slugID;
