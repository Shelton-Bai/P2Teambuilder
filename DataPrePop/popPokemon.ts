import axios from 'axios';
import { Pokedex } from './data/pokedex';
import { PokedexEntry, FormatDataBase } from './types';
import { FormatsData } from './data/formats-data';

const API_URL = 'http://localhost:8080/p2api/pokemon';
const DELETE_URL = 'http://localhost:8080/p2api/pokemon/';

interface Pokemon {
	alias: string;
	name: string;
	type1: string;
	type2?: string;
	ability0: string;
	ability1?: string;
	abilityh?: string;
	gender?: string;
	hp: number;
	atk: number;
	def: number;
	spa: number;
	spd: number;
	spe: number;
	weight?: number;
	forme?: string;
	tag?: string;
	isNonStandard?: string;
}

async function popPokemon() {
	const entries = Object.entries(Pokedex) as [string, PokedexEntry][];

	for (const [alias, data] of entries) {
		const pokemon: Pokemon = {
			alias,
			name: data.name,
			type1: data.types[0],
			type2: data.types[1] || undefined,
			ability0: data.abilities[0] || '',
			ability1: data.abilities[1] || '',
			abilityh: data.abilities.H || '',
			gender: data.gender || 'B',
			hp: data.baseStats.hp,
			atk: data.baseStats.atk,
			def: data.baseStats.def,
			spa: data.baseStats.spa,
			spd: data.baseStats.spd,
			spe: data.baseStats.spe,
			weight: data.weightkg || undefined,
			forme: data.forme || undefined,
			tag: data.tag || undefined,
		};

		try {
			await axios.put(API_URL, pokemon);
			console.log(`Successfully added ${pokemon.alias}`);
		} catch (error) {
			console.error(`Failed to add ${pokemon.alias}:`, error);
		}
	}

	for (const [alias, data] of Object.entries(FormatsData)) {
		const formatData: FormatDataBase = data;
		if (formatData.isNonstandard) {
			try {
				await axios.delete(DELETE_URL + `${alias}`);
				console.log(`Successfully deleted non-standard Pokémon ${alias}`);
			} catch (error) {
				console.error(`Failed to delete ${alias}:`, error);
			}
		}
	}

}

popPokemon();
