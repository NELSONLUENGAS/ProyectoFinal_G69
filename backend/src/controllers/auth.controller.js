const { hashPassword, verifyPasswords } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const Auth = require('../models/Auth');

const handleLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await Auth.exists(email);

		if (!user) {
			res.status(404).json({ msg: 'Usuario no encontrado' });
		}

		const match = verifyPasswords(password, user.password);

		if (match) {
			const data = {
				email,
			};

			const token = signToken(data);
			res.status(200).json({
				msg: 'Login exitoso',
				data: {
					email,
					token,
				},
			});
		} else {
			res.status(401).send('Credenciales errroneas');
		}
	} catch (error) {
		next(error);
	}
};

const handleRegister = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const passwordHashed = hashPassword(password);

		const user = await Auth.register(email, passwordHashed);

		res.send(user);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	handleLogin,
	handleRegister,
};
