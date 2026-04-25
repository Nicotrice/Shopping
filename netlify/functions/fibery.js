const https = require('https');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const FIBERY_TOKEN = '48be8a5c.60d2672deb1f5ff1d80ce4a146101193077';

  return new Promise((resolve) => {
    const options = {
      hostname: 'dudley-house.fibery.io',
      path: '/api/graphql/space/Shopping%20Log',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${FIBERY_TOKEN}`,
        'Content-Length': Buffer.byteLength(event.body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: data
        });
      });
    });

    req.on('error', (e) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: e.message })
      });
    });

    req.write(event.body);
    req.end();
  });
};
