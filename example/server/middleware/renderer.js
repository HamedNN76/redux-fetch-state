const React = require('react');
const ReactDOMServer = require('react-dom/server');

const App = require('../../src/App').default;

const path = require("path");
const fs = require("fs");
const Loadable = require("react-loadable");
const manifest = require('../../build/asset-manifest.json');
const { StaticRouter } = require('react-router-dom');

module.exports = (req, res) => {

  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    const modules = [];
    const html = ReactDOMServer.renderToString(
      <Loadable.Capture report={m => modules.push(m)}>
        <StaticRouter location={req.url} context={{}}>
          <App/>
        </StaticRouter>
      </Loadable.Capture>
    );
    console.log(modules, 'This is chunked modules');
    const extractAssets = (assets, chunks) => Object.keys(assets)
      .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
      .map(k => assets[k]);

    console.log(extractAssets(manifest, modules));

    const extraChunks = extractAssets(manifest, modules)
      .map(c => `<script type="text/javascript" src="/${c}"></script>`);

    return res.send(
      htmlData
        .replace(
          '<div id="root"></div>',
          `<div id="root">${html}</div>`
        )
        .replace(
          '</body>',
          extraChunks.join('') + '</body>'
        )
    );
  });
};
