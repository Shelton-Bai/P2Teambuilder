import { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import { Virtuoso } from 'react-virtuoso';

const apiUrl = import.meta.env.VITE_API_URL;

function MoveList({ roster, setRoster, currBuild, pokemonInfo, moveIndex }) {

	const fetchPokemonMoves = async () => {
		try {
			const params = Object.fromEntries(
				Object.entries(moveFilters).filter(([_, value]) => value !== null && value !== undefined && value !== '')
			);

			const response = await axios({
				url: `${apiUrl}/pokemon/${roster[currBuild].pokemonAlias}/moves`,
				method: 'get',
				params: params
			});
			if(response.status === 200){
				setMoveList(response.data);
				console.log(response);
			}
		} catch (error) {
			console.error(error);
		}
	}

	const [moveFilters, setMoveFilters] = useState({
        categories: '',
        types: '',
        minPriority: null,
        maxPriority: null,
        minPower: null,
        maxPower: null,
        minAccuracy: null,
        maxAccuracy: null,
        andFilters: true,
        sortBy: 'name',
        reverseSort: true
    });

	const [moveList, setMoveList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		fetchPokemonMoves();
		setSearchText('');
		console.log("set new moves for ", roster[currBuild].pokemonAlias);
	}, [roster, currBuild]);

	useEffect(() => {
		setFilteredList(moveList);
		console.log("filtered new moves");
	}, [moveList]);

	const filterMoves = (text) => {
		if (text === '') {
			setFilteredList(moveList);
		} else {
			const filtered = moveList.filter(move =>
				move.name.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredList(filtered);
		}	
	}

	const setMove = (move) => {
		const updatedRoster = [...roster];

		const currentBuild = {...updatedRoster[currBuild]};
		const updatedMoves = [...currentBuild.moveArray];
		updatedMoves[moveIndex] = move;
		updatedRoster[currBuild] = {
            ...updatedRoster[currBuild],
            moveArray: updatedMoves
        };
		setRoster(updatedRoster);
		console.table(updatedMoves);
		setSearchText('');
	}

	return (
		<div className='flex flex-col border-pory-blue border rounded-xl p-2 text-white h-full'>
			<p className='text-xl'>Move Search</p>
			<input
				type='text'
				placeholder='Move Name'
				value={searchText}
				onChange={(e) => {
					setSearchText(e.target.value);
					filterMoves(e.target.value);
				}}
				className='input input-text text-lg w-full mb-2'
			/>

			<Virtuoso
				style={{ height: 600 }}
				data={filteredList}
				itemContent={(_, moveInfo) => (
					<MoveListCard moveInfo={moveInfo} onClick={setMove} />
				)}
			/>

		</div>
	);
}

const MoveListCard = ({ moveInfo, onClick }) => {
	return (
		<div className='py-1'>
			<div className='text-left border-pory-blue border rounded-xl active:border-pory-red p-2' onClick={() => { onClick(moveInfo.name) }}>
				{moveInfo.name}, {moveInfo.type}
			</div>
		</div>
	);
}

export default MoveList;
