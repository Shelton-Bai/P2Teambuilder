import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TeamContext = createContext();

const apiUrl = import.meta.env.VITE_API_URL;

const TeamProvider = ({ children }) => {
	const [currTeam, setTeam] = useState({});
	const [currRoster, setRoster] = useState([]);

	const saveTeam = async (userId) => {
		try {
			const response = await axios.put(`${apiUrl}/users/${userId}/teams`, currTeam, {
				params: currTeam.id > 0 ? {id:currTeam.id} : {}
			});
			// console.log(response);
		} catch (e) {
			console.error(e);
		}
	}

	useEffect(() => {
		const updated = {
			...currTeam,
			roster: currRoster
		};
		setTeam(updated);
	}, [currRoster]);

	return (
		<TeamContext.Provider value={{ currTeam, currRoster, setTeam, setRoster, saveTeam }}>
			{children}
		</TeamContext.Provider>
	);
};

export { TeamContext, TeamProvider };