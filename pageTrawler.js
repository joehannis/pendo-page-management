require('dotenv').config();

const pageTrawler = async () => {
  let urlList = [];
  const response = await fetch('https://app.pendo.io/api/v1/page', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-pendo-integration-key': process.env.INTEGRATION_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  data.map((page) => {
    urlList.push(page.id);
  });

  return urlList;
};

module.exports = pageTrawler;
