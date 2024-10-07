import axios from 'axios';
import { AbilitiesText } from './data/abilities';

type AbilityDetail = {
    name: string;
    desc?: string;
    shortDesc: string;
};

const API_URL = 'http://localhost:8080/p2api/abilities';

async function populateDatabase() {
    try {
        const abilitiesText = AbilitiesText as unknown as Record<string, AbilityDetail>;

        for (const key in abilitiesText) {
            if (Object.prototype.hasOwnProperty.call(abilitiesText, key)) {
                const ability = abilitiesText[key];
                const payload = {
                    alias: key,
                    name: ability.name,
                    description: ability.desc || undefined,
                    shortDescription: ability.shortDesc,
                };

                await axios.put(API_URL, payload);
                console.log(`Ability ${key} saved successfully.`);
            }
        }
    } catch (error) {
        console.error('Error populating database:', error);
    }
}

populateDatabase();
