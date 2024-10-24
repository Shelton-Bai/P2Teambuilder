import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import substituteImage from '../../assets/substitute.png';
import TypeIcon from './TypeIcon';

const apiUrl = import.meta.env.VITE_API_URL;

function PokemonCard({ build, onClick, onDelete }) {

	const [ready, setReady] = useState(false);

	const [sprite, setSprite] = useState(substituteImage);

	const fetchPokemonInfo = async () => {
		try {
			const response = await axios({
				url: `https://pokeapi.co/api/v2/pokemon/${build.pokemonAlias}`,
				method: 'get'
			});
			const sprites = response.data.sprites;
			chooseSprite(sprites);
		} catch (e) {
			// console.log(e);
			setSprite(substituteImage);
		}
		try {
			const response = await axios({
				url: `http://localhost:8080/p2api/pokemon/${build.pokemonAlias}`,
				method: 'get',
			});
			if (response.status === 200) {
				setPokemonInfo(response.data);
				setReady(true);
			}
		} catch (error) {
			// console.error(error);
		}
	}

	const [pokemonInfo, setPokemonInfo] = useState({});

	useEffect(() => {
		fetchPokemonInfo();
	}, [build]);

	const getColor = (type) => {
		switch (type.toLowerCase()) {
			case 'normal':
				return 'bg-typecolor-normal';
			case 'fire':
				return 'bg-typecolor-fire';
			case 'water':
				return 'bg-typecolor-water';
			case 'electric':
				return 'bg-typecolor-electric';
			case 'grass':
				return 'bg-typecolor-grass';
			case 'ice':
				return 'bg-typecolor-ice';
			case 'fighting':
				return 'bg-typecolor-fighting';
			case 'poison':
				return 'bg-typecolor-poison';
			case 'ground':
				return 'bg-typecolor-ground';
			case 'flying':
				return 'bg-typecolor-flying';
			case 'psychic':
				return 'bg-typecolor-psychic';
			case 'bug':
				return 'bg-typecolor-bug';
			case 'rock':
				return 'bg-typecolor-rock';
			case 'ghost':
				return 'bg-typecolor-ghost';
			case 'dragon':
				return 'bg-typecolor-dragon';
			case 'dark':
				return 'bg-typecolor-dark';
			case 'steel':
				return 'bg-typecolor-steel';
			case 'fairy':
				return 'bg-typecolor-fairy';
			default:
				return 'bg-typecolor-normal';
		}
	}

	const chooseSprite = (sprites) => {
		if (build.shiny && sprites.front_shiny) {
			setSprite(sprites.front_shiny);
		} else if (sprites.front_default) {
			setSprite(sprites.front_default);
		} else {
			setSprite(substituteImage);
		}
	}

	return (
		<div className='bg-mono-300 flex flex-col border items-end border-pory-blue rounded-xl w-full  ' onClick={onClick}>
			{ready && (
				<>
					<button className='mr-2 mt-1 border rounded-xl border-pory-blue p-1 hover:border-pory-red' onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>

					<div className='flex flex-row gap-2 p-2 aspect-video w-full'>
						<div className='border border-pory-blue basis-1/3 rounded-xl p-2 flex flex-col truncate'>
							<div className={`relative aspect-square`}>
								{sprite ? <img className='absolute' src={sprite} alt={build.pokemonAlias} /> : <p>Loading...</p>}
							</div>
							<div className='flex flex-row h-5 gap-2'>
								<TypeIcon type={pokemonInfo.type1} />
								{pokemonInfo.type2 && (
									<TypeIcon type={pokemonInfo.type2}/>
								)}
							</div>
							<p>{build.pokemonName}</p>
							<p>{build.ability}</p>
							<p>{build.item || 'No Item'}</p>
						</div>

						<div className='flex flex-col basis-2/3 gap-2'>
							<div className='flex flex-col border border-pory-blue basis-1/2 rounded-xl p-1 gap-1'>
								<div className='flex flex-row gap-1 basis-1/2'>
									<div className='basis-1/2 border border-pory-blue rounded-xl p-2 truncate'>
										{build.moveArray[0] || 'No Move'}
									</div>
									<div className='basis-1/2 border border-pory-blue rounded-xl p-2 truncate'>
										{build.moveArray[1] || 'No Move'}
									</div>
								</div>
								<div className='flex flex-row gap-1 basis-1/2'>
									<div className='basis-1/2 border border-pory-blue rounded-xl truncate p-2'>
										{build.moveArray[2] || 'No Move'}
									</div>
									<div className='basis-1/2 border border-pory-blue rounded-xl p-2 truncate'>
										{build.moveArray[3] || 'No Move'}
									</div>
								</div>
							</div>
							<div className='border border-pory-blue basis-1/2 rounded-xl p-2'>
								<p>
									{build.nature} nature
								</p>
								<div className='flex flex-row gap-2 text-sm'>
									<div>
										<p>HP</p>
										<p>{build.evArray[0]}</p>
									</div>
									<div>
										<p>Atk</p>
										<p>{build.evArray[1]}</p>
									</div>
									<div>
										<p>Def</p>
										<p>{build.evArray[2]}</p>
									</div>
									<div>
										<p>SpA</p>
										<p>{build.evArray[3]}</p>
									</div>
									<div>
										<p>SpD</p>
										<p>{build.evArray[4]}</p>
									</div>
									<div>
										<p>Spe</p>
										<p>{build.evArray[5]}</p>
									</div>
								</div>

							</div>
						</div>
					</div>
				</>
			)}


		</div>
	)
};

export default PokemonCard;