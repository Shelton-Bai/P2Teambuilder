const axios = require('axios');

// API URLs for users and teams
const userBaseURL = 'http://localhost:8080/p2api/users';
const teamBaseURL = 'http://localhost:8080/p2api/users/{userId}/teams';

// User data
const userData = {
    username: "test",
    password: "test",
    email: "test@test.com"
};

// Team and Pokémon set data
const teamsData = [
    {
        name: "Team Alpha",  // First team
        roster: [
            {
                pokemonName: "Venusaur",
                pokemonAlias: "venusaur",
                item: "Leftovers",
                ability: "Overgrow",
                moves: "Giga Drain,Sludge Bomb,Synthesis,Leech Seed",
                level: 100,
                nature: "Calm",
                evs: "252,0,128,0,128,0",
                ivs: "31,31,31,31,31,31"
            },
            {
                pokemonName: "Blastoise",
                pokemonAlias: "blastoise",
                item: "Assault Vest",
                ability: "Torrent",
                moves: "Scald,Ice Beam,Earthquake,Rapid Spin",
                level: 100,
                nature: "Bold",
                evs: "252,0,252,0,4,0",
                ivs: "31,31,31,31,31,31"
            },
            {
                pokemonName: "Charizard",
                pokemonAlias: "charizard",
                item: "Heavy-Duty Boots",
                ability: "Blaze",
                moves: "Flamethrower,Air Slash,Roost,Focus Blast",
                level: 100,
                nature: "Timid",
                evs: "0,0,0,252,4,252",
                ivs: "31,0,31,31,31,31"
            }
        ]
    },
    {
        name: "Team Beta",  // Second team
        roster: [
            {
                pokemonName: "Pikachu",
                pokemonAlias: "pikachu",
                item: "Light Ball",
                ability: "Static",
                moves: "Volt Tackle,Iron Tail,Quick Attack,Thunderbolt",
                level: 100,
                nature: "Jolly",
                evs: "0,252,0,0,4,252",
                ivs: "31,31,31,31,31,31"
            },
            {
                pokemonName: "Eevee",
                pokemonAlias: "eevee",
                item: "Eviolite",
                ability: "Adaptability",
                moves: "Quick Attack,Double-Edge,Bite,Baby-Doll Eyes",
                level: 100,
                nature: "Adamant",
                evs: "252,252,0,0,4,0",
                ivs: "31,31,31,31,31,31"
            }
        ]
    }
];

// Function to populate user
async function populateUser() {
    try {
        const response = await axios.post(userBaseURL, userData);
        console.log(`Success: Added user with username: ${response.data.username}`);
        return response.data.id;  // Return user ID to link teams
    } catch (error) {
        console.error(`Error: Could not add user - ${error.message}`);
    }
}

// Function to add teams to the user
async function populateTeams(userId) {
    try {
        for (const team of teamsData) {
            const teamResponse = await axios.put(teamBaseURL.replace('{userId}', userId), team);
            console.log(`Success: Added team ${team.name} for user ${userId}`);
        }
    } catch (error) {
        console.error(`Error: Could not add team - ${error.message}`);
    }
}

// Main execution sequence
(async function main() {
    console.log(`Population process started at ${new Date().toISOString()}`);

    // Populate user
    const userId = await populateUser();

    // Populate teams if user was added successfully
    if (userId) {
        await populateTeams(userId);
    }

    console.log(`Population process completed at ${new Date().toISOString()}`);
})();
