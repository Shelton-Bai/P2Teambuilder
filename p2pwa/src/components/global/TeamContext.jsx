import React, { createContext, useState } from 'react';

const TeamContext = createContext();

const TeamProvider = ({ children }) => {
	const [currTeam, setTeam] = useState([]);
	const [currRoster, setRoster] = useState([]);

	return (
		<TeamContext.Provider value={{ currTeam, currRoster, setTeam, setRoster }}>
			{children}
		</TeamContext.Provider>
	);
};

export { TeamContext, TeamProvider };