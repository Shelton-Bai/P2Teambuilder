const axios = require('axios');
const fs = require('fs');
const Moves = require('./data/moves'); // Assuming this is your moves.js file
const MovesText = require('./data/move_text'); // Assuming this is your move_text.js file

const baseURL = 'http://localhost:8080/p2api/moves';
const logFile = './movesLog.txt';

// Configurable variables for batch size and delay to control multithreading
const BATCH_SIZE = 300;
const DELAY = 1000; // in milliseconds (1 second)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to populate the database with move data in batches
async function populateMoves() {
    const startTime = Date.now();
    const logStream = fs.createWriteStream(logFile, { flags: 'a' });
    const promises = [];

    for (const alias in Moves) {
        if (Moves.hasOwnProperty(alias)) {
            const move = Moves[alias];
            const moveText = MovesText[alias] || {}; // Get the move text if available

            // Create the move object
            const moveData = {
                alias: alias,
                name: move.name,
                accuracy: move.accuracy === true ? -1 : move.accuracy, // Set to -1 if can't miss
                power: move.basePower || null,
                priority: move.priority || 0,
                pp: move.pp || null,
                category: move.category || null,
                type: move.type || null,
                target: move.target || null,
                description: moveText.desc || null,
                shortDescription: moveText.shortDesc || null,
            };

            const promise = axios.post(baseURL, moveData)
                .then(() => {
                    logStream.write(`Success: Added ${move.name} (${alias})\n`);
                })
                .catch((error) => {
                    logStream.write(`Error: Adding ${move.name} (${alias}) - ${error.message}\n`);
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
    console.log(`Population of moves completed in ${(endTime - startTime) / 1000} seconds`);
}

// Function to remove non-standard moves in batches
async function removeNonStandardMoves() {
    const startTime = Date.now();
    const logStream = fs.createWriteStream(logFile, { flags: 'a' });
    const promises = [];

    for (const alias in Moves) {
        if (Moves.hasOwnProperty(alias) && Moves[alias].isNonstandard === 'Past') {
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
    console.log(`Removal of non-standard moves completed in ${(endTime - startTime) / 1000} seconds`);
}

// Main execution sequence
(async function main() {
    fs.writeFileSync(logFile, `Moves population started at ${new Date().toISOString()}\n`, { flag: 'w' });

    // Populate database with moves
    await populateMoves();

    // Remove non-standard moves
    await removeNonStandardMoves();

    fs.appendFileSync(logFile, `Moves population completed at ${new Date().toISOString()}\n`);
})();
