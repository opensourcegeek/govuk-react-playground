import _ from 'babel-polyfill';
import Hapi from 'hapi';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';
import App from '../client/App';
import { collect } from 'linaria/server';
import fs from 'fs';

const readData = fileName => {
  return new Promise((res, rej) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        rej(err);
      }
      res(data);
    })
  });
};

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

const setupServerRoute = (server) => {
  server.route({
    method: ['GET'],
    path: '/static/{param*}',
    handler: async (req, h) => {
      try {
        const data = await readData('/home/opensourcegeek/projects/transformuk/mmo-ecc-reference-data-svc/src/main/resources/db/data/species.csv')
        const styled = renderStylesToString(renderToString(<App speciesData={data} />));
        return h.response(getHtml(styled));

      } catch(e) {
        console.error(e);
        return h.response(getHtml(<h5>Error!!!!!!!!!!!!1</h5>));
      }
      
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
  setupServerRoute(server);
  setupClientRoute(server);
  await server.start();
}


const delay = n => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, n);
  });
}

const printAfterAwait = async () => {
  const someItems = [1,2];
  let items = [];
  // someItems.map(async i => {
  //   await delay(2000);
  //   items.push(i * 2);
  //   console.log('After waiting', items);
  // });
  // for(let i=0; i<someItems.length; i++) {
  //   await delay(2000);
  //   items.push(someItems[i] * 2);
  //   console.log('After waiting', items);
  // }
  const promises = someItems.map(() => {   
    return delay(2000);
  });

  const allCompleted = await Promise.all(promises);
  // [ {response}, {response} ]

  // console.log(items);
  console.log('Finished');
}

(async () => {
  await printAfterAwait();
  start();
})();

