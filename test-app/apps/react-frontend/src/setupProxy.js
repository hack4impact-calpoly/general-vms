/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require("http-proxy-middleware");

const expectedHost = process.env.BACKEND_HOST || process.env.DEFAULT_BACKEND_HOST;

if (!expectedHost) {
  throw new Error("No backend host given for proxy!");
}

const PORT_REGEX = /localhost:(\d+)/;
const portMatch = expectedHost.match(PORT_REGEX);
let port;
if (portMatch) {
  port = portMatch[1];
}

function getPortStr() {
  return port ? `:${port}` : "";
}

module.exports = function (app) {
  // eslint-disable-next-line
  app.use(
    "/api",
    createProxyMiddleware({
      target: expectedHost,
      changeOrigin: true,
      onProxyReq: (proxyReq, req) => {
        const newUrl = `${proxyReq.protocol}//${proxyReq.host}${getPortStr()}${proxyReq.path}`;

        console.log(`\nPROXY SERVER [INFO]: [${req.method}] ${req.url} -> ${newUrl}\n`);
      },
      logLevel: "warn",
    }),
  );
};
