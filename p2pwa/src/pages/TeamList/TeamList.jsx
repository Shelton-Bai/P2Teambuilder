import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../components/global/UserContext';
import { TeamContext } from '../../components/global/TeamContext';
import TeamCard from './TeamCard';

const apiUrl = import.meta.env.VITE_API_URL;

function TeamList({}) {
	const { userId } = useContext(UserContext);
	const { currTeam, currRoster, setTeam, setRoster } = useContext(TeamContext);
	const navigate = useNavigate();

	const [teams, setTeams] = useState([]);

	const fetchTeams = async () => {		
		try {
			const response = await axios.get(`${apiUrl}/users/${userId}/teams`);
			// console.table(response.data);
			setTeams(response.data);
		} catch (error) {
			console.error('Login failed:', error);
			alert('something wrong');
		}
	}

	useEffect(() => {
		fetchTeams();
	},[]);

	return (
		<div className='bg-mono-300 min-h-screen flex flex-col items-center justify-center gap-12'>
			{teams.map((team, index) => (
				<TeamCard team={team} key={index} onClick={() => {
					setTeam(team);
					setRoster(team.roster);
					navigate('/team')
				}}/>
			))}
			
			<button className='text-6xl rounded-xl bg-pory-blue text-white p-2 active:bg-pory-red w-4/5' onClick={() => {navigate('/')}}>
				Back
			</button>
		</div>
	)
}

export default TeamList;
