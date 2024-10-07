import axios from 'axios';
import { Learnsets } from './data/learnsets';

const API_URL = 'http://localhost:8080/p2api/learnset/addmovetopokemon';

interface LearnsetRequest {
    pokemonAlias: string;
    moveAlias: string;
}


const getGen9Moves = (learnset: { [move: string]: string[] }) => {
    const gen9Moves: string[] = [];

    for (const move in learnset) {
        const learnMethods = learnset[move];
        if (learnMethods.some((method) => method.startsWith('9'))) {
            gen9Moves.push(move);
        }
    }

    return gen9Moves;
};

const popLearnsets = async () => {
    for (const [pokemonAlias, data] of Object.entries(Learnsets)) {
        const learnset = (data as any).learnset;
        const gen9Moves = getGen9Moves(learnset);
		console.log(`adding moves to ${pokemonAlias}`);
        for (const moveAlias of gen9Moves) {
            const learnsetEntry: LearnsetRequest = { pokemonAlias, moveAlias };
            try {
                const response = await axios.post(API_URL, learnsetEntry);
                if (response.status !== 200) {
                    console.error(`Failed to add move ${moveAlias} to ${pokemonAlias}`);
                }
            } catch (error) {
                console.error(`Error adding move ${moveAlias} to ${pokemonAlias}: ${error}`);
            }
        }
    }
};

popLearnsets();
