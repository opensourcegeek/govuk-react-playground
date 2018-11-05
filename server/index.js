import _ from 'babel-polyfill';
import Hapi from 'hapi';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';
import App from '../client/App';

const getHtml = (data) => {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" rel="stylesheet">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>React App</title>
      </head>
      <body>
        <div id="root">${data}</div>
      </body>
    </html>
  `;
  return template;
}

const getClientOnlyHtml = () => {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" rel="stylesheet">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>React App</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="public/bundle.js"></script>
      </body>
    </html>
  `;
  return template;
}

const setupDefault = (server) => {
  server.route({
    method: ['GET'],
    path: '/static/{param*}',
    handler: (req, h) => {
      // return h.response(getHtml('Booooo'));
      const styled = renderStylesToString(renderToString(<App />));
      return h.response(getHtml(styled));
    }
  });
};

const setupClientRoute = (server) => {
  server.route({
    method: ['GET'],
    path: '/{param*}',
    handler: (req, h) => {
      return h.response(getClientOnlyHtml());
    }
  });
};

const setupStaticContentHandler = (server) => {
  server.route({
    method: ['GET'],
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });
  console.info('Added static handler');
};

const start = async () => {
  const server = Hapi.Server({
    port: 10001
  });
  await server.register(require('inert'));
  setupStaticContentHandler(server);
  setupDefault(server);
  setupClientRoute(server);
  await server.start();
}

(() => {
  start();
})();

