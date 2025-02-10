const { addSwaggerPath } = require('../swaggerConfig');

addSwaggerPath(
	'/api/eventos/delete/:id',
	'delete',
	{
		summary: 'Eliminar un evento por id',
		tags: ['Eventos'],
		responses: {
			200: {
				description: 'Elimina un evento',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Evento',
						},
					},
				},
			},
			400: {
				description: 'Error en la solicitud',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Error',
						},
					},
				},
			},
			401: {
				description: 'No autorizado - Token ausente o inválido',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Error',
						},
					},
				},
			},
		},
	},
	true
);
