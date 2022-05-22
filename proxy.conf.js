const { env } = require('process');

const target = 'https://localhost:44375';

const PROXY_CONFIG = [
  {
    context: [
      "/chat"
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
