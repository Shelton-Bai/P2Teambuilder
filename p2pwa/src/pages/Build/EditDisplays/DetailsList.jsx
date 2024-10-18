import { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import { Switch, TextField, Label, Input, NumberField, Group, Button, ComboBox, ListBox, ListBoxItem, RadioGroup, Radio, Popover } from 'react-aria-components';

const apiUrl = import.meta.env.VITE_API_URL;

function DetailsList({ roster, setRoster, currBuild, pokemonInfo }) {
	const [nickname, setNickName] = useState(roster[currBuild].nickname || '');
	const [shiny, setShiny] = useState(roster[currBuild].shiny || false);
	const [level, setLevel] = useState(roster[currBuild].level || 100);
	const [gender, setGender] = useState(roster[currBuild].gender || "");

	const teraTypes = [
		'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy', 'Stellar'
	];

	const [teraType, setTeraType] = useState((roster[currBuild].teraType === null || teraTypes.indexOf(roster[currBuild]).teraType === -1) ? teraTypes.indexOf(pokemonInfo.type1) + 1 : teraTypes.indexOf(roster[currBuild].teraType) + 1);

	const setDetail = (key, value) => {
		const updatedRoster = [...roster];
		updatedRoster[currBuild] = {
			...updatedRoster[currBuild],
			[key]: value
		};
		setRoster(updatedRoster);
	}

	return (
		<div className='flex flex-col border-pory-blue border rounded-xl p-2 text-white gap-4 lg:gap-2 h-full'>
			<p className='flex text-xl'>Details</p>

			<TextField className="flex flex-col text-xl" placeholder='Nickname' value={nickname} onChange={(text) => { setNickName(text); setDetail('nickname', text) }}>
				<Label className='text-2xl lg:text-base'>Nickname</Label>
				<Input className='input input-text text-lg w-full' />
			</TextField>



			<div className='flex flex-col lg:flex-row gap-2'>
				<ComboBox
					className={'flex flex-col text-xl text-white'}
					selectedKey={`react-aria-${teraType}`}
					onSelectionChange={(key) => {
						setTeraType(key.replace('react-aria-', ''));
						let newType = teraTypes[key.replace('react-aria-', '') - 1];
						setDetail('teraType', newType);
					}}
				>
					<Label className='text-2xl lg:text-base'>Tera Type</Label>
					<div className=''>
						<Input className={'bg-inherit border-pory-blue border-y-2 border-l-2 rounded-l-xl p-2'} />
						<Button className={'border-pory-blue border-y-2 border r-2 rounded-r-xl p-2 text-xl'}>▼</Button>
					</div>
					<Popover className={'bg-mono-300 rounded-xl border border-pory-blue p-2 text-xl overflow-auto'}>
						<ListBox className={'text-xl text-white'}>
							{teraTypes.map((type, index) => (
								<ListBoxItem key={index} textValue={type} className={'hover:text-pory-blue rounded-xl text-base hover:cursor-pointer'}>{type}</ListBoxItem>
							))}
						</ListBox>
					</Popover>
				</ComboBox>

				<NumberField
					value={level}
					onChange={(lvl) => {
						setLevel(lvl); setDetail('level', lvl);
					}}
					minValue={1}
					maxValue={100}
					className={'flex flex-col text-xl'}
					formatOptions={{
						minimumIntegerDigits: 3
					}}
				>
					<Label className='text-2xl lg:text-base'>Level</Label>
					<Group className={''}>
						<Button slot="decrement" className={'bg-inherit border-pory-blue border-y-2 border-l-2 p-2 font-extrabold rounded-l-xl text-pory-blue pressed:text-white disabled:text-pory-red'}>-</Button>
						<Input className={'bg-inherit border-pory-blue border-2 p-2 w-16 text-center'} />
						<Button slot="increment" className={'bg-inherit border-pory-blue border-y-2 border-r-2 p-2 font-extrabold rounded-r-xl text-pory-blue pressed:text-white disabled:text-pory-red'}>+</Button>
					</Group>
				</NumberField>
			</div>

			<Switch
				className="group flex gap-2 items-center text-white text-2xl lg:text-lg"
				isSelected={shiny} onChange={(isSelected) => {
					setShiny(isSelected);
					setDetail('shiny', isSelected);
				}}
			>
				<div className="switchtrack-2xl lg:switchtrack-xl">
					<span className="switchthumb-2xl lg:switchthumb-xl" />
				</div>
				Shiny
			</Switch>



			{pokemonInfo.gender === 'B' ? (
				<RadioGroup
					className={'flex flex-col text-xl lg:text-base gap-1'}
					value={gender}
					onChange={(value) => {
						setGender(value);
						setDetail('gender', value);
					}}
				>
					<Label className='text-2xl lg:text-base'>Gender</Label>
					<Radio value="M" className={'flex flex-row items-center gap-2 group'} >
						<div className='radio-xl'>
							<span className='radiothumb-xl' />
						</div>
						M
					</Radio>
					<Radio value="F" className={'flex flex-row items-center gap-2 group'}>
						<div className='radio-xl'>
							<span className='radiothumb-xl' />
						</div>
						F
					</Radio>
					<Radio value="" className={'flex flex-row items-center gap-2 group'}>
						<div className='radio-xl'>
							<span className='radiothumb-xl' />
						</div>
						Random
					</Radio>
				</RadioGroup>
			) : (
				<p className='text-2xl'>Gender <br></br> {pokemonInfo.gender}</p>
			)}
		</div>
	);
}

export default DetailsList;
