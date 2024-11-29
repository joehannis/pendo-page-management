require('dotenv').config();

const pageTester = async (idList) => {
  const results = [];
  try {
    const results = [];
    await Promise.all(
      idList.map(async (id) => {
        const requestBody = {
          response: {
            location: 'request',
            mimeType: 'application/json',
          },
          requests: [
            {
              name: 'pageEvents',
              pipeline: [
                {
                  source: {
                    pageEvents: null,
                    timeSeries: {
                      count: -3,
                      first: 'now()',
                      period: 'dayRange',
                    },
                  },
                },
                {
                  filter: `pageId==\`${id}\``,
                },
                {
                  limit: 1,
                },
              ],
              requestId: 'pageEvents',
            },
          ],
        };

        try {
          const response = await fetch(process.env.URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Cookie: `pendo.sess.jwt2=${process.env.COOKIE}`,
            },
            body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          if (data?.messages[0]?.rows.length === 0) {
            results.push(id);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      })
    );

    console.log('Results', results);
    return results;
  } catch (error) {
    console.log('Error', error);
    return [];
  }
};
module.exports = pageTester;
