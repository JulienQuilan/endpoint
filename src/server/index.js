/* eslint-disable no-console, no-process-env, no-undef */

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express from 'express';
import morgan from 'morgan';
import path from 'path';
import raven from 'raven';
import statusCat from 'http-status-cats';

import api from './api';
import config from '../../config/server';
import Context from './context';
import middleware from './middleware';
import view from './view';
import util from './util';

/* Initialization */
const app = Express();
app.disable('x-powered-by');
const ctx = new Context();
raven.config(config.sentry.dsn).install();

/* Trust production reverse proxy */
app.set('trust proxy', true);

/* Static routes */
app.use('/static', Express.static(path.resolve(__dirname, '../client/static')));

/* Express middleware */
app.use(raven.requestHandler());
app.use(cors());
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json({type: '*/*', limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(statusCat());
app.use(middleware.response.bind(null, ctx));

/* API endpoints */
app.put('/api/endpoint/add', util.withRequestJSON(ctx, api.endpoint.add));

/* View endpoints */
app.get('/endpoint/:endpoint', view.endpoint.bind(null, ctx));
app.post('/endpoint/:endpoint', view.endpoint.bind(null, ctx));
app.get('*', view.main.bind(null, ctx));

app.use(raven.errorHandler());

const server = app.listen(process.env.PORT || config.meta.port || 3000, () => {
  const port = server.address().port;
  console.log('Server is listening at %s', port);
});
