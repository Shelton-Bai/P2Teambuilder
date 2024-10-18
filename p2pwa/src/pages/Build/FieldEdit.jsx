import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PokemonList from './EditDisplays/PokemonList';
import ItemList from './EditDisplays/ItemList';
import AbilityList from './EditDisplays/AbilityList';
import MoveList from './EditDisplays/MoveList';
import DetailsList from './EditDisplays/DetailsList';
import StatEdit from './EditDisplays/StatEdit';

const apiUrl = import.meta.env.VITE_API_URL;

function FieldEdit({ roster, currBuild, pokemonInfo, selectedField, setRoster, fetchPokemonInfo }) {
	const [build, setBuild] = useState(roster[currBuild]);

	useEffect(() => {
		setBuild(roster[currBuild])
	}, [roster, currBuild]);

	return (
		<div className='flex flex-col text-white flex-1 overflow-hidden xl:overflow-visible'>
			{selectedField === 'Species' && (
				<PokemonList roster={roster} setRoster={setRoster} currBuild={currBuild} fetchPokemonInfo={fetchPokemonInfo} />
			)}

			{selectedField === 'Ability' && (
				<AbilityList roster={roster} setRoster={setRoster} currBuild={currBuild} pokemonInfo={pokemonInfo} />
			)}

			{selectedField === 'Item' && (
				<ItemList roster={roster} setRoster={setRoster} currBuild={currBuild} />
			)}

			{selectedField === 'Details' && (
				<DetailsList roster={roster} setRoster={setRoster} currBuild={currBuild} pokemonInfo={pokemonInfo} />
			)}

			{selectedField === 'Move 1' && (
				<MoveList roster={roster} setRoster={setRoster} currBuild={currBuild} fetchPokemonInfo={fetchPokemonInfo} moveIndex={0} />
			)}

			{selectedField === 'Move 2' && (
				<MoveList roster={roster} setRoster={setRoster} currBuild={currBuild} pokemonInfo={pokemonInfo} moveIndex={1} />
			)}

			{selectedField === 'Move 3' && (
				<MoveList roster={roster} setRoster={setRoster} currBuild={currBuild} pokemonInfo={pokemonInfo} moveIndex={2} />
			)}

			{selectedField === 'Move 4' && (
				<MoveList roster={roster} setRoster={setRoster} currBuild={currBuild} pokemonInfo={pokemonInfo} moveIndex={3} />
			)}

			{selectedField === 'Stats' && (
				<StatEdit roster={roster} setRoster={setRoster} currBuild={currBuild} pokemonInfo={pokemonInfo} />
			)}
		</div>
	);
}



export default FieldEdit;
