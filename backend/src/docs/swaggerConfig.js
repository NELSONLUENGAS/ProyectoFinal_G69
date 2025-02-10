const swaggerJsDoc = require('swagger-jsdoc');
const { schemas } = require('./swaggerSchemas');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Api Backend',
			version: '1.0.0',
			description: 'Documentación API con swagger',
		},
		components: {
			securitySchemas: {
				bearerAuth: {
					type: 'http',
					schema: 'bearer',
					bearerFormat: 'JWT',
				},
			},
			schemas,
		},
		paths: {},
	},
	apis: [],
};

const specs = swaggerJsDoc(options);

const addSwaggerPath = (path, method, config, requiresAuth = false) => {
	if (!specs.paths[path]) {
		specs.paths[path] = {};
	}

	if (requiresAuth) {
		config.security = [{ bearerAuth: [] }];
	}

	specs.paths[path][method] = config;
};

module.exports = {
	specs,
	addSwaggerPath,
};
