const axios = require('axios');
const fs = require('fs');
const Pokedex = require('./data/pokedex');
const FormatsData = require('./data/formats-data');

const baseURL = 'http://localhost:8080/p2api/pokemon';
const logFile = './pokedexLog.txt';

// Configurable variables for batch size and delay to control multithreading
const BATCH_SIZE = 300;
const DELAY = 1; // in milliseconds (1 second)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to populate the database with Pokémon data in batches
async function populatePokedex() {
	const startTime = Date.now();
	const logStream = fs.createWriteStream(logFile, { flags: 'a' });
	const promises = [];

	for (const alias in Pokedex) {
		if (Pokedex.hasOwnProperty(alias)) {
			const p = Pokedex[alias];

			// Create the Pokémon object
			const pokemonData = {
				alias: alias,
				name: p.name,
				type1: p.types[0],
				type2: p.types[1] || null,
				ability0: p.abilities[0],
				ability1: p.abilities[1] || null,
				abilityh: p.abilities.H || null,
				gender: getGender(p),
				hp: p.baseStats.hp,
				atk: p.baseStats.atk,
				def: p.baseStats.def,
				spa: p.baseStats.spa,
				spd: p.baseStats.spd,
				spe: p.baseStats.spe,
				weight: p.weightkg,
				forme: p.forme || null,
				tag: FormatsData[alias]?.tier || null,
				isNonStandard: FormatsData[alias]?.isNonstandard || null,
			};

			const promise = axios.post(baseURL, pokemonData)
				.then(() => {
					logStream.write(`Success: Added ${p.name} (${alias})\n`);
				})
				.catch((error) => {
					logStream.write(`Error: Adding ${p.name} (${alias}) - ${error.message}\n`);
				});

			promises.push(promise);

			// Process in batches
			if (promises.length >= BATCH_SIZE) {
				await Promise.all(promises);
				promises.length = 0;
				await sleep(DELAY);
			}
		}
	}

	// Process remaining promises
	if (promises.length > 0) {
		await Promise.all(promises);
	}
	logStream.end();
	const endTime = Date.now();
	console.log(`Population completed in ${(endTime - startTime) / 1000} seconds`);
}

// Function to remove non-standard Pokémon in batches
async function removeNonStandardPokemon() {
	const startTime = Date.now();
	const logStream = fs.createWriteStream(logFile, { flags: 'a' });
	const promises = [];

	for (const alias in FormatsData) {
		if (FormatsData.hasOwnProperty(alias) && FormatsData[alias].isNonstandard) {
			const promise = axios.delete(`${baseURL}/${alias}`)
				.then(() => {
					logStream.write(`Success: Removed non-standard ${alias}\n`);
				})
				.catch((error) => {
					logStream.write(`Error: Removing non-standard ${alias} - ${error.message}\n`);
				});

			promises.push(promise);

			// Process in batches
			if (promises.length >= BATCH_SIZE) {
				await Promise.all(promises);
				promises.length = 0;
				await sleep(DELAY);
			}
		}
	}

	// Process remaining promises
	if (promises.length > 0) {
		await Promise.all(promises);
	}
	logStream.end();
	const endTime = Date.now();
	console.log(`Removal of non-standard Pokémon completed in ${(endTime - startTime) / 1000} seconds`);
}

// Helper function to determine gender based on either gender ratio or fixed gender
function getGender(pokemon) {
	if (pokemon.gender) return pokemon.gender;
	if (pokemon.genderRatio) return 'B';
	return 'B';
}

// Main execution sequence
(async function main() {
	fs.writeFileSync(logFile, `Pokedex population started at ${new Date().toISOString()}\n`, { flag: 'w' });

	// Populate database with Pokémon
	await populatePokedex();

	// Remove non-standard Pokémon
	await removeNonStandardPokemon();

	fs.appendFileSync(logFile, `Pokedex population completed at ${new Date().toISOString()}\n`);
})();
