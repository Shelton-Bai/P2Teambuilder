import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './components/global/UserContext.jsx'
import './index.css'
import { TeamProvider } from './components/global/TeamContext.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<UserProvider>
			<TeamProvider>
				<App />
			</TeamProvider>
		</UserProvider>
	</StrictMode>,
)
