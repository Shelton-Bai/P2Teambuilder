import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../components/global/UserContext';

const apiUrl = import.meta.env.VITE_API_URL;

function Login({setIsAuthenticated}) {
	const { userId, login, logout } = useContext(UserContext);
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPass, setShowPass] = useState(false);
	const [email, setEmail] = useState('');
	const [isNewAccount, setNewAccount] = useState(false);

	//do later with actual api
	const handleLogin = async () => {		
		if(isNewAccount){
			if (username.trim() === '' || password.trim() === '' || email.trim() === '') {
				alert("Make sure all fields are filled!");
			} else {
				const userJSON = {
					username,
					password,
					email
				};
				try {
					const response = await axios.post(`${apiUrl}/users`, userJSON);
					if(response.status === 200){
						setIsAuthenticated(true);
						login(response.data.id);
						navigate('/');
					}
				} catch (error) {
					console.error(error);
					alert('something wrong');
				}
			}
		} else {
			if (username.trim() === '' || password.trim() === '') {
				alert("Fill out all fields!");
			} else {
				try {
					const response = await axios.post(`${apiUrl}/users/login`, null, {
						params: {
							username: username,
							password: password
						}
					});
					if(response.status === 200){
						setIsAuthenticated(true);
						login(response.data.id);
						navigate('/');
					}
				} catch (error) {
					console.error('Login failed:', error);
					alert('something wrong');
				}
			}
		}
	}

	const switchNewAccount = () => {
		setNewAccount(!isNewAccount);
		setShowPass(false);
		setPassword('');
		setEmail('');
		setUsername('');
	};

	return (
		<div className='bg-mono-300 min-h-screen flex flex-col items-center justify-center'>
			
			<div className='border-4 border-pory-blue rounded-2xl w-4/5 p-4 flex flex-col items-center gap-4'>
				<p className='text-6xl font-semibold text-pory-red'>
					Sign In
				</p>
				{isNewAccount && (
					<>
					<input
						type='text'
						placeholder='Email'
						value={email}
						onChange={(e) => {setEmail(e.target.value)}}
						className='input input-text w-full'
					/>
					</>
				)}
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={(e) => {setUsername(e.target.value)}}
					className='input input-text w-full'
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => {setPassword(e.target.value)}}
					className='input input-text w-full'
				/>
				<button
					onClick={handleLogin}
					className='bg-pory-blue rounded-xl text-4xl text-white p-2 active:bg-pory-red flex w-full items-center flex-col outline-none'
				>
					{isNewAccount ? 'Create Account' : 'Log In'}
				</button>
			</div>
			<p className='text-pory-blue mt-4'>{!isNewAccount ? 'Don\'t' : 'Already'} have an account?</p>
			<button
				onClick={switchNewAccount}
				className='bg-pory-blue rounded-xl text-2xl text-white p-2 active:bg-pory-red flex w-3/5 items-center flex-col outline-none'
			>
				{isNewAccount ? 'Log In' : 'Sign Up'}
			</button>
		</div>
	)
}

export default Login;
