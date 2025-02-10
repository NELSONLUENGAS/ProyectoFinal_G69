require('./docs/routes/index.routes');
const swaggerUi = require('swagger-ui-express');
const { specs } = require('./docs/swaggerConfig');

const express = require('express');
const morgan = require('morgan');
const APIRoutes = require('./routes/routes');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(
	cors({
		origin: [
			process.env.NODE_ENV == 'production'
				? 'https://proyectofinal-g69.onrender.com'
				: 'http://localhost:5173',
		],
	})
);

// Routes
app.use('/api', APIRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorMiddleware);

module.exports = app;
