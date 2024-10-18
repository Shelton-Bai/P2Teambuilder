import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

	const login = (id) => {
		setUserId(id);
		localStorage.setItem('userId', id);
	};

	const logout = () => {
		setUserId(null);
		localStorage.removeItem('userId');
	};

	return (
		<UserContext.Provider value={{ userId, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };