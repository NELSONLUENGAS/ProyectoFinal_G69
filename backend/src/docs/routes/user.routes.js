const { addSwaggerPath } = require('../swaggerConfig');

addSwaggerPath(
	'/users',
	'get',
	{
		summary: 'Obtiene todos los usuarios',
		tags: ['Usuarios'],
		responses: {
			200: {
				description: 'Lista de usuarios obtenida correctamente',
				content: {
					'application/json': {
						schema: { $ref: '#/components/schemas/User' },
					},
				},
			},
			400: {
				description: 'Error en la solicitud',
				content: {
					'application/json': {
						schema: { $ref: '#/components/schemas/Error' },
					},
				},
			},
			401: {
				description: 'No autorizado - Token inválido o ausente',
				content: {
					'application/json': {
						schema: { $ref: '#/components/schemas/Error' },
					},
				},
			},
		},
	},
	true
);
