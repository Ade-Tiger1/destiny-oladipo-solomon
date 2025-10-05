const express = require('express');
const app = express();
const routes = require('./routes');
const responseWrapper = require('./middlewares/responseWrapper');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('express-rate-limit');

app.use(express.json());
app.use(responseWrapper);

app.get('/health', (req, res) => res.ok({ status: 'ok', uptime: process.uptime() }));

// basic rate limit
app.use(rateLimit({ windowMs: 60 * 1000, max: 200 }));

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;