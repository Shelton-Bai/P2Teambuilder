const axios = require('axios');
const { Moves } = require('./data/moves');
const { MovesText } = require('./data/move_text');

const API_URL = 'http://localhost:8080/p2api/moves';
const DESCRIPTION_URL = 'http://localhost:8080/p2api/moves/description';

async function popMoves() {
  const entries = Object.entries(Moves);

  for (const [alias, moveData] of entries) {
	if (moveData.isNonstandard) {
	  console.log(`Skipping nonstandard move: ${alias}`);
	  continue;
	}

	const move = {
	  alias,
	  name: moveData.name,
	  accuracy: moveData.accuracy === true ? -1 : moveData.accuracy,
	  power: moveData.basePower || 0, 
	  priority: moveData.priority || 0,
	  pp: moveData.pp || 0,
	  category: moveData.category || '',
	  type: moveData.type || '',
	  target: moveData.target || '',
	};

	try {
	  // Save the move itself
	  await axios.put(API_URL, move);
	  console.log(`Successfully added move: ${move.name}`);
	} catch (error) {
	  console.error(`Failed to add move: ${move.name}`, error);
	}


	const moveText = MovesText[alias];
	if (moveText) {
	  const descriptionRequest = {
		alias,
		desc: moveText.desc || '',
		shortDesc: moveText.shortDesc || '',
	  };

	  try {

		await axios.put(DESCRIPTION_URL, descriptionRequest);
		console.log(`Successfully added description for: ${move.name}`);
	  } catch (error) {
		console.error(`Failed to add description for: ${move.name}`, error);
	  }
	}
  }
}

popMoves();
