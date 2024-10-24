import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../components/global/UserContext';
import { TeamContext } from '../../components/global/TeamContext';
import TeamCard from './TeamCard';

const apiUrl = import.meta.env.VITE_API_URL;

function TeamList({ }) {
	const { userId } = useContext(UserContext);
	const { currTeam, currRoster, setTeam, setRoster } = useContext(TeamContext);
	const navigate = useNavigate();

	const [teams, setTeams] = useState([]);

	const fetchTeams = async () => {
		try {
			const response = await axios.get(`${apiUrl}/users/${userId}/teams`);
			setTeams(response.data);
		} catch (error) {
			console.error('Login failed:', error);
			alert('something wrong');
		}
	}

	const deleteTeam = async (id) => {
		try {
			const response = await axios.delete(`${apiUrl}/teams/${id}`);
			console.log(response.data);
		} catch (error) {
			console.error('delete failed:', error);
			alert('something wrong');
		}
	}

	useEffect(() => {
		fetchTeams();
	}, [teams]);

	return (
		<div className='bg-mono-300 min-h-screen max-h-screen flex flex-col p-2 gap-2'>

			<button className='text-6xl rounded-xl bg-pory-blue text-white p-2 active:bg-pory-red w-full' onClick={() => { navigate('/') }}>
				Back
			</button>

			<button className='text-6xl rounded-xl bg-pory-blue text-white p-2 active:bg-pory-red w-full' onClick={() => {
				console.log(teams);
				const newTeam = {
					id: 0,
					name: 'New Team',
					roster: []
				};
				setTeam(newTeam);
				setRoster(newTeam.roster);
				navigate('/team');
			}}>
				Add Team
			</button>

			<div className='flex flex-col p-2 border border-pory-blue rounded-xl overflow-auto flex-1 gap-2'>
				{teams.map((team, index) => (
					<TeamCard team={team} key={index}
						onClick={() => {
							setTeam(team);
							setRoster(team.roster);
							navigate('/team');
						}}
						onDelete={() => {
							deleteTeam(team.id);
						}}
					/>
				))}
			</div>



		</div>
	)
}

export default TeamList;
