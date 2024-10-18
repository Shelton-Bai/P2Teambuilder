import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TeamContext } from '../../components/global/TeamContext';

const apiUrl = import.meta.env.VITE_API_URL;

function Team({ }) {
	const navigate = useNavigate();
	const { currTeam, currRoster, setTeam, setRoster } = useContext(TeamContext);

	return (
		<div className='bg-mono-300 min-h-screen flex flex-col items-center justify-center gap-12'>
			{currRoster.map((build, index) => (
				<div key={index} className='text-3xl text-white border border-pory-blue p-4 border-2 rounded-xl' onClick={() => { navigate(`/build/${index}`) }}>
					{build.pokemonName}
				</div>
			))}

			<button className='text-6xl rounded-xl bg-pory-blue text-white p-2 active:bg-pory-red w-4/5' onClick={() => { navigate('/teamlist') }}>
				Back
			</button>
		</div>
	)
}

export default Team;
