import { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import { Virtuoso } from 'react-virtuoso';
import TypeIcon from '../../../components/global/TypeIcon';

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
			<div
				className='text-left border-pory-blue border rounded-xl active:border-pory-red p-2 flex flex-row'
				onClick={() => { onClick(pokemonInfo) }}
			>

				<div className='basis-1/2 flex flex-col'>
					<div className='flex flex-row items-center'>
						<div className='basis-9/12 truncate'>
							{pokemonInfo.name}
						</div>
						<div className='h-5 w-5 flex flex-row gap-1 basis-3/12'>
							<TypeIcon type={pokemonInfo.type1} />
							{pokemonInfo.type2 && (
								<TypeIcon type={pokemonInfo.type2} />
							)}
						</div>
					</div>
					<div className='text-xs'>
						{pokemonInfo.ability0}{pokemonInfo.ability1 && ', ' + pokemonInfo.ability1}
					</div>
					<div className='text-xs'>
						{pokemonInfo.abilityh}
					</div>

				</div>
				<div className='flex flex-row gap-1 text-xs basis-1/2 justify-end font-mono'>
					<div>
						<p className='whitespace-pre'>HP </p>
						<p>{pokemonInfo.hp}</p>
					</div>
					<div>
						<p>Atk</p>
						<p>{pokemonInfo.atk}</p>
					</div>
					<div>
						<p>Def</p>
						<p>{pokemonInfo.def}</p>
					</div>
					<div>
						<p>SpA</p>
						<p>{pokemonInfo.spa}</p>
					</div>
					<div>
						<p>SpD</p>
						<p>{pokemonInfo.spd}</p>
					</div>
					<div>
						<p>Spe</p>
						<p>{pokemonInfo.spe}</p>
					</div>
					<div>
						<p>BST</p>
						<p>{pokemonInfo.hp + pokemonInfo.atk + pokemonInfo.def + pokemonInfo.spa + pokemonInfo.spd + pokemonInfo.spe}</p>
					</div>
				</div>


			</div>
		</div>
	);
}

export default PokemonList;
