const express = require('express');
const morgan = require('morgan');
const APIRoutes = require('./routes/routes');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');

const swaggerUi = require('swagger-ui-express');
const { specs } = require('./docs/swaggerConfig');

const app = express();
require('./docs/routes/index');
// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Routes
app.use('/api', APIRoutes);

app.use(errorMiddleware);

module.exports = app;
