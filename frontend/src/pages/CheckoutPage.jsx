import { loadStripe } from '@stripe/stripe-js';
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import {
	Card,
	Typography,
	List,
	Image,
	Button,
	Space,
	Divider,
	Spin,
} from 'antd';
import { useCallback } from 'react';
import { useCart } from '../hooks/useCart';
const { Text, Title } = Typography;

const { VITE_STRIPE_PUBLIC_KEY, VITE_API_URL } = import.meta.env;

export const CheckoutPage = () => {
	const stripePromise = loadStripe(String(VITE_STRIPE_PUBLIC_KEY));

	const { cart } = useCart();

	const fetchClientSecret = useCallback(() => {
		return fetch(`${VITE_API_URL}/api/gateways/create-checkout-session`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify([...cart]),
		})
			.then((res) => res.json())
			.then((session) => {
				return session.data.clientSecret;
			});
	}, [cart]);

	const options = { fetchClientSecret };

	// Calculate Total
	const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

	return (
		<div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
			<Title
				level={2}
				style={{ textAlign: 'center', marginBottom: '24px' }}
			>
				Checkout Page
			</Title>

			<Card
				title="Payment"
				style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
				bordered={false}
			>
				<EmbeddedCheckoutProvider
					stripe={stripePromise}
					options={options}
				>
					<EmbeddedCheckout />
				</EmbeddedCheckoutProvider>
				<div style={{ textAlign: 'center', marginTop: '16px' }}>
					<Spin
						tip="Processing payment..."
						spinning={false}
					/>
				</div>
			</Card>

			<div style={{ textAlign: 'center', marginTop: '24px' }}>
				<Button
					type="primary"
					size="large"
					style={{ borderRadius: '8px' }}
					onClick={() => console.log('Payment submitted')}
				>
					Submit Payment
				</Button>
			</div>
		</div>
	);
};
