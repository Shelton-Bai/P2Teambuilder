import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Virtuoso } from 'react-virtuoso'

const apiUrl = import.meta.env.VITE_API_URL;

function ItemList({ roster, setRoster, currBuild }) {
	const [build, setBuild] = useState(roster[currBuild]);

	const [itemList, setItemList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		fetchItems();
		setSearchText('');
	}, [roster, currBuild]);

	useEffect(() => {
		setFilteredList(itemList);
	}, [itemList]);

	const fetchItems = async () => {
		try {
			const response = await axios.get(`${apiUrl}/items`);
			if (response.status === 200) {
				// console.log('Got Items');
				setItemList(response.data);
			}
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	const filterItems = (text) => {
		if (text === '') {
			setFilteredList(itemList);
		} else {
			const filtered = itemList.filter(item =>
				item.name.toLowerCase().includes(text.toLowerCase())
			);
			setFilteredList(filtered);
		}
	}

	const setItem = (item) => {
		const updatedRoster = [...roster];
		updatedRoster[currBuild] = {
			...updatedRoster[currBuild],
			item: item
		};
		setRoster(updatedRoster);
		setSearchText('');
	}

	return (
		<div className='flex flex-col border-pory-blue border rounded-xl text-white h-full p-2'>
			<p className='text-xl'>Item Search</p>
			<input
				type='text'
				placeholder='Item Name'
				value={searchText}
				onChange={(e) => {
					setSearchText(e.target.value);
					filterItems(e.target.value);
				}}
				className='input input-text text-lg w-full'
			/>

			<Virtuoso
				style={{ height: 600 }}
				data={filteredList}
				itemContent={(_, item) => (
					<ItemListCard item={item} onClick={setItem} />
				)}
			/>
		</div>
	);
}

const ItemListCard = ({ item, onClick }) => {
	return (
		<div className='py-1'>
			<div className='text-left border-pory-blue border rounded-xl active:border-pory-red p-2 w-full' onClick={() => { onClick(item.name) }}>
				{item.name}
			</div>
		</div>
	);
}

export default ItemList;
