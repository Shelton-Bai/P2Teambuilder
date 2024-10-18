import { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import { Virtuoso } from 'react-virtuoso';

const apiUrl = import.meta.env.VITE_API_URL;

function PokemonList({ roster, setRoster, currBuild, fetchPokemonInfo }) {
	const [build, setBuild] = useState(roster[currBuild]);

	const [pokemonFilters, setPokemonFilters] = useState({
		types: '',
		moves: '',
		abilities: '',
		maxHP: null,
		minHP: null,
		maxAtk: null,
		minAtk: null,
		maxDef: null,
		minDef: null,
		maxSpA: null,
		minSpA: null,
		maxSpD: null,
		minSpD: null,
		maxSpe: null,
		minSpe: null,
		andFilters: true,
		sortBy: 'name',
		reverseSort: false
	});

	const [pokemonList, setPokemonList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		fetchPokemon();
		setSearchText('');
		fetchPokemonInfo();
	}, [roster, currBuild, pokemonFilters]);

	useEffect(() => {
		setFilteredList(pokemonList);
	}, [pokemonList]);

	const fetchPokemon = async () => {
		try {
			const params = Object.fromEntries(
				Object.entries(pokemonFilters).filter(([_, value]) => value !== null && value !== undefined && value !== '')
			);

			const response = await axios({
				url: `${apiUrl}/pokemon`,
				method: 'get',
				params: params
			});
			if (response.status === 200) {
				setPokemonList(response.data);
			}
		} catch (error) {
			console.error(error);
		}
	}

	const filterPokemon = (text) => {
		if (text === '') {
			setFilteredList(pokemonList);
		} else {
			const filtered = pokemonList.filter(pokemon =>
				pokemon.name.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredList(filtered);
		}
	}

	const setPokemon = (pokemonInfo) => {
		const updatedRoster = [...roster];
		updatedRoster[currBuild] = {
			...updatedRoster[currBuild],
			pokemonAlias: pokemonInfo.alias,
			pokemonName: pokemonInfo.name,
			ability: pokemonInfo.ability0,
			item: '',
			moveArray: ['', '', '', ''],
			evArray: [0, 0, 0, 0, 0, 0],
			ivArray: [31, 31, 31, 31, 31, 31],
			nature: 'Quirky',
			teraType: pokemonInfo.type1,
			level: 100,
			shiny: false,
			nickname: '',
		};
		setRoster(updatedRoster);
		setSearchText('');
	}

	return (
		<div className='flex flex-col border-pory-blue border rounded-xl p-2 text-white h-full'>
			<p className='text-xl'>Pokemon Search</p>
			<input
				type='text'
				placeholder='Pokemon Name'
				value={searchText}
				onChange={(e) => {
					setSearchText(e.target.value);
					filterPokemon(e.target.value);
				}}
				className='input input-text text-lg w-full mb-2'
			/>

			<Virtuoso
				style={{ height: 600 }}
				data={filteredList}
				itemContent={(_, pokemonInfo) => (
					<PokemonListCard pokemonInfo={pokemonInfo} onClick={setPokemon} />
				)}
			/>

		</div>
	);
}

const PokemonListCard = ({ pokemonInfo, onClick }) => {
	return (
		<div className='py-1'>
			<div className='text-left border-pory-blue border rounded-xl active:border-pory-red p-2' onClick={() => { onClick(pokemonInfo) }}>
				{pokemonInfo.name}, {pokemonInfo.type1}, {pokemonInfo.type2}
			</div>
		</div>
	);
}

export default PokemonList;
