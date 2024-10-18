import { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext } from './components/global/UserContext';
import ProtectedRoute from './components/global/ProtectedRoute';
import Home from './pages/Home'
import Login from './pages/Login'
import TeamList from './pages/TeamList/TeamList';
import Team from './pages/Team/Team';
import Build from './pages/Build/Build';

function App() {
	const { userId } = useContext(UserContext);
	const [isAuthenticated, setIsAuthenticated] = useState(!!userId);

	useEffect(() => {
		setIsAuthenticated(!!userId);
		// console.log(userId);
	}, []);

	return (
		<Router>
			<Routes>
				<Route index element={
					<ProtectedRoute isAuthenticated={isAuthenticated}>
						<Home/>
					</ProtectedRoute>
				} />
				<Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />

				<Route path='/teamlist' element={
					<ProtectedRoute isAuthenticated={isAuthenticated}>
						<TeamList/>
					</ProtectedRoute>
				} />
				<Route path='/team' element={
					<ProtectedRoute isAuthenticated={isAuthenticated}>
						<Team/>
					</ProtectedRoute>
				} />
				<Route path='/build/:index' element={
					<ProtectedRoute isAuthenticated={isAuthenticated}>
						<Build/>
					</ProtectedRoute>
				} />
			</Routes>
		</Router>
	)
}

export default App
