const schemas = {
	Evento: {
		type: 'object',
		properties: {
			id: { type: 'integer', example: 1 },
			name: { type: 'string', example: 'Desarrollo de software' },
			place: { type: 'string', example: 'Santiago Chile' },
		},
	},
	Error: {
		type: 'object',
		properties: {
			message: { type: 'string', example: 'Error en los datos' },
			code: { type: 'integer', example: 400 },
		},
	},
};

module.exports = {
	schemas,
};
