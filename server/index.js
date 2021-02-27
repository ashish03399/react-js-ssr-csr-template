import React from 'react';
import path from 'path';
import fs from 'fs';
import express from 'express';
import App from '../src/App';
import ReactDOMServer from 'react-dom/server';

const app = express();
const PORT = process.env.PORT || 3000;

const addDevMiddleWare = (app) => {
  // adding middle ware
  const webpack = require('webpack');
  // it will auto build on file changes
  const middleware = require('webpack-dev-middleware');
  // will reload the page
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const clientConfigDev = require('../src/config/client.dev');
  const serverConfigDev = require('../src/config/server.dev');
  const compiler = webpack(
    [clientConfigDev, serverConfigDev]
  );
  // for auto compilation after change in file
  app.use(
      middleware(compiler, {
    publicPath: clientConfigDev.output.publicPath,
    serverSideRender: true,
    stats: 'errors-only',
    writeToDisk: true,
    })
  );
  const clientCompiler = compiler.compilers.find(c => c.name === 'client');
  // for auto reload after hot module rebuild
  app.use(webpackHotMiddleware(clientCompiler, {
    reload: true,
    path: '/__webpack_hmr',
    heartbeat: 4000,
  }));
}

app.get('/', (req, res) => {
  const appDirectory = fs.realpathSync(process.cwd());
  const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
  const cssFile = resolveApp('build/css/main.css');
  const indexFile = resolveApp('build/index.html');
  // TODO : below code will be removed once content being create through template
  fs.readFile(indexFile, 'utf8', (err, htmltemplate) => {
    fs.readFile(cssFile, 'utf8', (err, styles) => {
      const html = ReactDOMServer.renderToString(<App />);
      return res.send(
        htmltemplate
          .replace('<style></style>', `<style>${styles}</style>`)
          .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      );
    });
  });
});

app.use(express.static('./build'));
if(process.env.NODE_ENV === 'development') {
  addDevMiddleWare(app);
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
