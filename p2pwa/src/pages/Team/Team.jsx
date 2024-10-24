import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TeamContext } from '../../components/global/TeamContext';
import { Switch, TextField, Label, Input, NumberField, Group, Button, ComboBox, ListBox, ListBoxItem, RadioGroup, Radio, Popover } from 'react-aria-components';
import PokemonCard from '../../components/global/PokemonCard';
import { UserContext } from '../../components/global/UserContext';

const apiUrl = import.meta.env.VITE_API_URL;

function Team({ }) {
	const navigate = useNavigate();
	const { currTeam, currRoster, setTeam, setRoster, saveTeam } = useContext(TeamContext);
	const { userId } = useContext(UserContext);

	const [name, setName] = useState(currTeam.name);

	const setTeamName = (newName) => {
		const updated = {
			...currTeam,
			name: newName,
		};
		setTeam(updated);
	}

	return (
		<div className='bg-mono-300 min-h-screen max-h-screen flex flex-col items-center gap-2 text-white p-2'>

			<button
				onClick={() => {
					saveTeam(userId);
					navigate('/teamlist')
				}}
				className='border border-pory-blue rounded-xl p-1'
			>
				Save and Exit
			</button>

			<TextField className="flex flex-col text-xl" placeholder='Team Name' value={name} onChange={(text) => { setName(text); setTeamName(text) }}>
				<Label className='text-2xl lg:text-base'>Team Name</Label>
				<Input className='input input-text text-lg w-full text-white' />
			</TextField>

			<div className='border border-pory-blue p-2 w-full rounded-xl flex flex-col overflow-auto gap-2 flex-1'>
				{currRoster.map((build, index) => (
					<PokemonCard build={build} key={index} onClick={() => { navigate(`/build/${index}`) }} onDelete={() => {
						const updatedRoster = [...currRoster];
						updatedRoster.splice(index, 1);
						setRoster(updatedRoster);
					}} />
				))}

				{currRoster.length < 6 && (
					<button
						className='text-3xl text-white border border-pory-blue p-4 border-2 rounded-xl'
						onClick={() => {
							const newPokemon = {
								ability: '',
								evArray: [0, 0, 0, 0, 0, 0],
								ivArray: [31, 31, 31, 31, 31, 31],
								gender: '',
								id: 0,
								level: 100,
								moveArray: ['', '', '', ''],
								nature: 'Quirky',
								nickname: '',
								pokemonAlias: '',
								pokemonName: '',
								setName: null,
								shiny: false,
								teraType: null,
								userId: 0,
							};
							currRoster.push(newPokemon);
							navigate(`/build/${currRoster.length - 1}`);
						}}
					>
						Add Pokemon
					</button>
				)}
			</div>




		</div>
	)
}

export default Team;
