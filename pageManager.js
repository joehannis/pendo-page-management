const pageTrawler = require('./pageTrawler');
const pageTester = require('./pageTester');

const pageManager = async () => {
  let pageList = await pageTrawler();

  pageTester(pageList);
};

pageManager();
