import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
	const { handleSession } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const [login, setLogin] = useState({
		email: '',
		password: '',
	});

	const handleOnChange = (event) => {
		const { name, value } = event.target;
		setLogin({
			...login,
			[name]: value,
		});
	};

	const handleSumbit = async (event) => {
		event.preventDefault();
		try {
			const userSession = await fetch(`${VITE_API_URL}/api/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(login),
			});

			console.log(userSession, 'User session');
			handleSession(userSession);

			setTimeout(() => {
				navigate(`/profile`);
			}, 1000);
		} catch (error) {
			setError(error.message);
		}
	};

	// useEffect(() => {
	// 	if (login.email && login.password) {
	// 		handleSession(login);
	// 	}
	// }, [login]);

	return (
		<form
			onSubmit={handleSumbit}
			className="space-y-4"
		>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email
				</label>
				<input
					onChange={handleOnChange}
					type="text"
					id="email"
					name="email"
					className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
				/>
			</div>
			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700"
				>
					Password
				</label>
				<input
					onChange={handleOnChange}
					type="password"
					id="password"
					name="password"
					className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
				/>
			</div>
			<div>
				<button
					type="submit"
					className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
				>
					Sign In
				</button>
			</div>

			{/* {error && (
				<div>
					<p className="text-center font-bold text-red-500">
						Credenciales erroneas
					</p>
				</div>
			)} */}
		</form>
	);
};
