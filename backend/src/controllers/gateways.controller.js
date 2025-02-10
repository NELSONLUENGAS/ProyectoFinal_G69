require('dotenv');
const { FRONTEND, STRIPE_SECRET_KEY } = process.env;

const stripe = require('stripe')(String(STRIPE_SECRET_KEY));

const handleCreateCheckoutSession = async (req, res, next) => {
	try {
		const cart = req.body;

		if (cart?.length) {
			const line_items = cart.map((product) => {
				return {
					price_data: {
						currency: 'usd',
						unit_amount: product.price * 100,
						product_data: {
							name: product.name,
							images: [product.image],
						},
					},
					quantity: product.quantity,
				};
			});

			const session = await stripe.checkout.sessions.create({
				ui_mode: 'embedded',
				line_items,
				mode: 'payment',
				return_url: `${FRONTEND}/success?session_id={CHECKOUT_SESSION_ID}`,
			});

			res.status(200).json({
				msg: 'Sesión de compra exitosa',
				data: {
					clientSecret: session.client_secret,
				},
			});
		} else {
			res.status(400).send('Carro vacio');
		}
	} catch (error) {
		next(error);
	}
};

const handleGetSessionStatus = async (req, res, next) => {
	try {
		const { session_id } = req.query;

		if (session_id) {
			const session = await stripe.checkout.sessions.retrieve(session_id);

			res.status(200).json({
				msg: 'Compra exitosa',
				data: {
					session,
				},
			});
		} else {
			res.status(400).send('Id de la sessión requerido');
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	handleGetSessionStatus,
	handleCreateCheckoutSession,
};
