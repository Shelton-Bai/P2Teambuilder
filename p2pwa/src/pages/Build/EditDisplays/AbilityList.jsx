import { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import { Virtuoso } from 'react-virtuoso';

const apiUrl = import.meta.env.VITE_API_URL;

function AbilityList({ roster, setRoster, currBuild, pokemonInfo }) {

	const a0 = pokemonInfo.ability0;
	const a1 = pokemonInfo.ability1;
	const ah = pokemonInfo.abilityh;

	const setAbility = (ability) => {
		const updatedRoster = [...roster];
		updatedRoster[currBuild] = {
			...updatedRoster[currBuild],
			ability: ability
		};
		setRoster(updatedRoster);
	}

	return (
		<div className='flex flex-col border-pory-blue border rounded-xl p-2 text-white h-full gap-4'>
			<p className='text-xl'>Abilities</p>

			{!!a0 && (
				<button className={`text-2xl border rounded-xl text-left p-2 ${roster[currBuild].ability === a0 ? 'border-pory-red' : 'border-pory-blue'}`} onClick={() => {
					setAbility(a0);
				}}>
					{a0}
				</button>
			)}

			{!!a1 && (
				<button className={`text-2xl border rounded-xl text-left p-2 ${roster[currBuild].ability === a1 ? 'border-pory-red' : 'border-pory-blue'}`} onClick={() => {
					setAbility(a1);
				}}>
					{a1}
				</button>
			)}

			{!!ah && (
				<button className={`text-2xl border rounded-xl text-left p-2 ${roster[currBuild].ability === ah ? 'border-pory-red' : 'border-pory-blue'}`} onClick={() => {
					setAbility(ah);
				}}>
					{ah}
				</button>
			)}

		</div>
	);
}

export default AbilityList;
