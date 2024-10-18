const axios = require('axios');
const fs = require('fs');
const Learnsets = require('./data/learnsets'); // Assuming this is your learnsets.js file

const baseURL = 'http://localhost:8080/p2api/pokemon';
const logFile = './learnsetsLog.txt';

const BATCH_SIZE = 300;
const DELAY = 1; // in milliseconds

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to populate the database with learnset data in batches
async function populateLearnsets() {
	const startTime = Date.now();
	const logStream = fs.createWriteStream(logFile, { flags: 'a' });
	const promises = [];

	for (const pokemonAlias in Learnsets) {
		if (Learnsets.hasOwnProperty(pokemonAlias)) {
			const learnset = Learnsets[pokemonAlias].learnset;

			for (const moveAlias in learnset) {
				if (learnset.hasOwnProperty(moveAlias)) {
					// Check if the move is part of Generation 9
					const moveLearnMethods = learnset[moveAlias];
					if (moveLearnMethods.some(method => method.includes("9"))) {
						const promise = axios.post(`${baseURL}/${pokemonAlias}/moves`, moveAlias,
							{
								headers: {
									'Content-Type': 'text/plain'
								}
							})
							.then(() => {
								logStream.write(`Success: Added move ${moveAlias} to ${pokemonAlias}\n`);
							})
							.catch((error) => {
								logStream.write(`Error: Adding move ${moveAlias} to ${pokemonAlias} - ${error.message}\n`);
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
			}
		}
	}

	// Process remaining promises
	if (promises.length > 0) {
		await Promise.all(promises);
	}
	logStream.end();
	const endTime = Date.now();
	console.log(`Population of learnsets completed in ${(endTime - startTime) / 1000} seconds`);
}

// Main execution sequence
(async function main() {
	fs.writeFileSync(logFile, `Learnsets population started at ${new Date().toISOString()}\n`, { flag: 'w' });

	// Populate database with learnsets
	await populateLearnsets();

	fs.appendFileSync(logFile, `Learnsets population completed at ${new Date().toISOString()}\n`);
})();
