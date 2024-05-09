import http from 'follow-redirects/http';
import fs from 'fs';

export default async function handler(req, res) {
  const options = {
    method: 'GET',
    hostname: '16.171.225.69',
    path: '/api/study/sections/',
    headers: {
      'X-API-KEY': 'c34e1756-d908-4a5c-9490-9088ee346b0e',
    },
    maxRedirects: 20,
  };

  const apiReq = http.request(options, (apiRes) => {
    const chunks = [];

    apiRes.on('data', (chunk) => {
      chunks.push(chunk);
    });

    apiRes.on('end', () => {
      const body = Buffer.concat(chunks);
      res.status(apiRes.statusCode).json({ data: body.toString() });
    });

    apiRes.on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  });

  apiReq.end();
}
