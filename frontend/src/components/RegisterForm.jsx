import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
	// const navigate = useNavigate();
	// const { handleSession } = useAuth();
	// const [loading, setLoading] = useState(false);

	// const [register, setRegister] = useState({
	// 	username: '',
	// 	email: '',
	// 	password: '',
	// });

	// const handleSumbit = async (event) => {
	// 	event.preventDefault();

	// 	const newUser = await fetch(`${VITE_API_URL}/api/auth/register`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(register),
	// 	});

	// 	const response = await newUser.json();

	// 	handleSession(response);
	// 	navigate('/login');
	// };

	// const handleOnChange = (event) => {
	// 	const { name, value } = event.target;

	// 	setRegister({
	// 		...register,
	// 		[name]: value,
	// 	});
	// };
	// const { handleSession } = useAuth();

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const handleOnChange = (event) => {
		const { name, value } = event.target;
		setUser({
			...user,
			[name]: value,
		});
	};

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		await handleRegister(user);
	};

	const handleRegister = async (user) => {
		return fetch('http://localhost:3001/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: user.email, password: user.password }),
		})
			.then((res) => res.json())
			.then((registeredUser) => navigate('/login'))
			.catch((error) => console.log(error));
	};

	return (
		<form
			onSubmit={handleSubmit}
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
					Sign Up
				</button>
			</div>
		</form>
	);
};
