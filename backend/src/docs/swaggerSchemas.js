const schemas = {
	User: {
		type: 'object',
		properties: {
			id: { type: 'integer', example: 1 },
			name: { type: 'string', example: 'Juan Pérez' },
			email: { type: 'string', example: 'juan@example.com' },
		},
	},
	Error: {
		type: 'object',
		properties: {
			message: { type: 'string', example: 'Error de validación' },
			code: { type: 'integer', example: 400 },
		},
	},
};

module.exports = schemas;
