import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FieldSelect from './FieldSelect';
import { TeamContext } from '../../components/global/TeamContext';
import FieldEdit from './FieldEdit';

const apiUrl = import.meta.env.VITE_API_URL;

function Build({ }) {
	const navigate = useNavigate();
	const { index } = useParams();
	const { currTeam, currRoster, setTeam, setRoster } = useContext(TeamContext);

	const fetchPokemonInfo = async () => {
		try {
			const response = await axios({
				url: `http://localhost:8080/p2api/pokemon/${currRoster[currBuild].pokemonAlias}`,
				method: 'get',
			});
			if (response.status === 200) {
				setPokemonInfo(response.data);
			}
		} catch (error) {
			console.error(error);
		}
	}

	const [currBuild, setCurrBuild] = useState(index);
	const [selectedField, setSelectedField] = useState('Species');
	const [pokemonInfo, setPokemonInfo] = useState({});

	useEffect(() => {
		fetchPokemonInfo();
	}, [currBuild]);

	const switchCurrBuild = (index) => {
		//check if index is current index, if so, do nothing
		if (currBuild === index) {
			console.log("not setting index ", index);
			return
		}
		//save the build at the current index
		//TODO
		//change the current build index to index
		setCurrBuild(index);
		console.log("setting index ", index);
		//reset editing fields for the build at the new index
	}

	return (
		<div className='bg-mono-300 flex flex-col h-screen p-2 gap-2 text-white'>
			<div className='flex flex-row border-pory-blue border p-2 gap-2 rounded-xl min-w-full'>
				<button
					className='bg-pory-blue p-1 rounded-xl'
					onClick={() => {
						if(currRoster[currBuild].pokemonAlias === ""){
							currRoster.pop();
						}
						navigate('/team');
					}}
				>
					Back
				</button>
			</div>
			<FieldSelect roster={currRoster} currBuild={currBuild} selectedField={selectedField} setSelectedField={setSelectedField} pokemonInfo={pokemonInfo} />
			<FieldEdit roster={currRoster} currBuild={currBuild} selectedField={selectedField} setRoster={setRoster} pokemonInfo={pokemonInfo} fetchPokemonInfo={fetchPokemonInfo} />
		</div>
	)
}

export default Build;
