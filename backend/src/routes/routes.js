const express = require('express');
const medicamentosRoutes = require('./medicamentos.routes');
const viajesRoutes = require('./viajes.routes');
const personalRoutes = require('./personal.routes');
const authRoutes = require('./auth.routes');
const eventosRoutes = require('./eventos.routes');
const gatewaysRoutes = require('./gateways.routes');

const app = express();

app.use('/medicamentos', medicamentosRoutes);
app.use('/viajes', viajesRoutes);
app.use('/personal', personalRoutes);
app.use('/auth', authRoutes);
app.use('/eventos', eventosRoutes);
app.use('/gateways', gatewaysRoutes);

module.exports = app;
