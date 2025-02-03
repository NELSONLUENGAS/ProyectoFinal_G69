const swaggerJsdoc = require('swagger-jsdoc');
const schemas = require('./swaggerSchemas');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API de Usuarios',
			version: '1.0.0',
			description: 'Documentación de la API con Swagger',
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
			schemas,
		},
		paths: {},
	},
	apis: [],
};

const specs = swaggerJsdoc(options);

/**
 * Función para registrar rutas en Swagger de manera modular
 * @param {string} path - Ruta del endpoint
 * @param {string} method - Método HTTP (get, post, etc.)
 * @param {object} config - Configuración del endpoint (summary, tags, responses, etc.)
 */
const addSwaggerPath = (path, method, config, requiresAuth = false) => {
	if (!specs.paths[path]) {
		specs.paths[path] = {};
	}

	if (requiresAuth) {
		config.security = [{ bearerAuth: [] }];
	}

	specs.paths[path][method] = config;
};

module.exports = { specs, addSwaggerPath };
