const express = require('express');
const serverRenderer = require('./middleware/renderer');

const PORT = 3030;
const path = require('path');

const app = express();
const router = express.Router();
const routes = require('../src/router/routes').default;
const Loadable = require('react-loadable');

router.use('^/$', serverRenderer);
routes.map(({ path }) => router.get(path, serverRenderer));

router.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxAge: '30d' },
));

app.use(router);

Loadable.preloadAll().then(() => {
  app.listen(PORT, (error) => {
    if (error) {
      return console.log('something bad happened', error);
    }

    console.log("listening on " + PORT + "...");
  });
});
