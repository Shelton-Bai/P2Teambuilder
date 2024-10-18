import { useState, useContext } from 'react';
import { UserContext } from '../components/global/UserContext';
import { useNavigate } from 'react-router-dom';

function Home() {
	const { userId, login, logout } = useContext(UserContext);
	const navigate = useNavigate();

	return (
		<div className='bg-mono-300 min-h-screen flex flex-col items-center justify-center gap-12'>
			<button className='text-6xl rounded-xl bg-pory-blue text-white p-2 active:bg-pory-red w-4/5' onClick={() => {
				navigate('/teamlist');
			}}>
				Teams
			</button>
			{/* <button className='text-6xl rounded-xl bg-pory-blue text-white p-2 active:bg-pory-red w-4/5'>
				Sets
			</button>
			<button className='text-6xl rounded-xl bg-pory-blue text-white p-2 active:bg-pory-red w-4/5'>
				Calc
			</button> */}
			<button className='text-6xl rounded-xl bg-pory-blue text-white p-2 active:bg-pory-red w-4/5' onClick={() => {
				logout();
				navigate('/login');
			}}>
				Log Out
			</button>
		</div>
	)
}

export default Home
