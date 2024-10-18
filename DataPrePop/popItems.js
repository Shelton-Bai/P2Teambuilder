const axios = require('axios');
const fs = require('fs');
const Items = require('./data/items'); // Assuming this is your items.js file
const ItemsText = require('./data/item_text'); // Assuming this is your item_text.js file

const baseURL = 'http://localhost:8080/p2api/items';
const logFile = './itemsLog.txt';

// Configurable variables for batch size and delay to control multithreading
const BATCH_SIZE = 300;
const DELAY = 1000; // in milliseconds (1 second)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to populate the database with item data in batches
async function populateItems() {
	const startTime = Date.now();
	const logStream = fs.createWriteStream(logFile, { flags: 'a' });
	const promises = [];

	for (const alias in Items) {
		if (Items.hasOwnProperty(alias)) {
			const item = Items[alias];
			const itemText = ItemsText[alias] || {};

			// Create the item object
			const itemData = {
				alias: alias,
				name: item.name,
				user: item.itemUser ? item.itemUser.join(', ') : null,
				isNonstandard: item.isNonstandard || null,
				description: itemText.description || null,
				shortDescription: itemText.shortDesc || null,
			};

			const promise = axios.post(baseURL, itemData)
				.then(() => {
					logStream.write(`Success: Added ${item.name} (${itemText.shortDesc})\n`);
				})
				.catch((error) => {
					logStream.write(`Error: Adding ${item.name} (${itemText.shortDesc}) - ${error.message}\n`);
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
	console.log(`Population of items completed in ${(endTime - startTime) / 1000} seconds`);
}

// Function to remove non-standard items in batches
async function removeNonStandardItems() {
	const startTime = Date.now();
	const logStream = fs.createWriteStream(logFile, { flags: 'a' });
	const promises = [];

	for (const alias in Items) {
		if (Items.hasOwnProperty(alias) && Items[alias].isNonstandard === 'Past') {
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
	console.log(`Removal of non-standard items completed in ${(endTime - startTime) / 1000} seconds`);
}

// Main execution sequence
(async function main() {
	fs.writeFileSync(logFile, `Items population started at ${new Date().toISOString()}\n`, { flag: 'w' });

	// Populate database with items
	await populateItems();

	// Remove non-standard items
	await removeNonStandardItems();

	fs.appendFileSync(logFile, `Items population completed at ${new Date().toISOString()}\n`);
})();
