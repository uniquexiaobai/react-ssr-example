import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../shared/configureStore';
import App from '../shared/app';
import { fetchData } from '../shared/api';

const app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 3000);

app.get('/', (req, res) => {
	fetchData().then(data => {
		render(data, html => {
			res.send(html);
		});
	});
});

function render(data, callback) {
	const store = configureStore(data);
	const preloadedState = store.getState();
	const markup = renderToString(
		<Provider store={store}>
			<App />
		</Provider>
	);

	callback(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__STATE__ = ${JSON.stringify(preloadedState)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `);
}
