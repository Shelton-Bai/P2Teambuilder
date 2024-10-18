const axios = require('axios');
const fs = require('fs');
const AbilitiesText = require('./data/abilities');

const baseURL = 'http://localhost:8080/p2api/abilities';
const logFile = './abilitiesLog.txt';

// Configurable variables for batch size and delay to control multithreading
const BATCH_SIZE = 300;
const DELAY = 1; // in milliseconds

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to populate the database with ability data in batches
async function populateAbilities() {
    const startTime = Date.now();
    const logStream = fs.createWriteStream(logFile, { flags: 'a' });
    const promises = [];

    for (const alias in AbilitiesText) {
        if (AbilitiesText.hasOwnProperty(alias)) {
            const ability = AbilitiesText[alias];

            // Create the ability object
            const abilityData = {
                alias: alias,
                name: ability.name,
                description: ability.desc || null,
                shortDescription: ability.shortDesc || null,
            };

            const promise = axios.post(baseURL, abilityData)
                .then(() => {
                    logStream.write(`Success: Added ${ability.name} (${alias})\n`);
                })
                .catch((error) => {
                    logStream.write(`Error: Adding ${ability.name} (${alias}) - ${error.message}\n`);
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
    console.log(`Population of abilities completed in ${(endTime - startTime) / 1000} seconds`);
}

// Function to remove non-standard abilities in batches
async function removeNonStandardAbilities() {
    const startTime = Date.now();
    const logStream = fs.createWriteStream(logFile, { flags: 'a' });
    const promises = [];

    for (const alias in AbilitiesText) {
        if (AbilitiesText.hasOwnProperty(alias) && AbilitiesText[alias].isNonstandard === 'Past') {
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
    console.log(`Removal of non-standard abilities completed in ${(endTime - startTime) / 1000} seconds`);
}

// Main execution sequence
(async function main() {
    fs.writeFileSync(logFile, `Abilities population started at ${new Date().toISOString()}\n`, { flag: 'w' });

    // Populate database with abilities
    await populateAbilities();

    // Remove non-standard abilities
    await removeNonStandardAbilities();

    fs.appendFileSync(logFile, `Abilities population completed at ${new Date().toISOString()}\n`);
})();
