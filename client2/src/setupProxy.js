import CONFIG from '../../ipconfig.json';

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${CONFIG.IP}:5000`,
      changeOrigin: true,
    }),
  );

  // app.use(
  //   '/userManage',
  //   createProxyMiddleware({
  //     target: 'http://localhost:6000',
  //     changeOrigin: true,
  //   }),
  // );
};
