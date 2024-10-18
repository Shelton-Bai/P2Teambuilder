import { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import { Switch, TextField, Label, Input, NumberField, Group, Button, ComboBox, ListBox, ListBoxItem, RadioGroup, Radio, Popover } from 'react-aria-components';
import { ResponsiveRadar } from '@nivo/radar'

const apiUrl = import.meta.env.VITE_API_URL;

function StatEdit({ roster, setRoster, currBuild, pokemonInfo }) {
	const [evs, setEvs] = useState(roster[currBuild].evs || [0, 0, 0, 0, 0, 0]);
	const [ivs, setIvs] = useState(roster[currBuild].ivs || [31, 31, 31, 31, 31, 31]);
	const [nature, setNature] = useState(roster[currBuild].nature || 'Quirky');

	const [data, setData] = useState([
		{
			"stat": 'HP',
			"evs": 252,
			"ivs": 31
		},
		{
			"stat": 'Attack',
			"evs": 45,
			"ivs": 31
		},
		{
			"stat": 'Defense',
			"evs": 86,
			"ivs": 31
		},
		{
			"stat": 'Sp. Attack',
			"evs": 65,
			"ivs": 31
		},
		{
			"stat": 'Sp. Defense',
			"evs": 234,
			"ivs": 31
		},
		{
			"stat": 'Speed',
			"evs": 12,
			"ivs": 31
		},
	]);


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
			<p className='flex text-xl'>Stats</p>

			<p>{evs.toString()}</p>
			<p>{ivs.toString()}</p>
			<p>{nature.toString()}</p>

			<div className='h-96 w-96 border bg-inherit'>
				<ResponsiveRadar
					data={data}
					keys={['evs', 'ivs']}
					indexBy="stat"
					valueFormat=">-.2f"
					margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
					borderColor='#4499dd'
					gridLabelOffset={36}
					dotSize={5}
					dotColor={{ theme: 'background' }}
					dotBorderWidth={1}
					colors={['#111111', '#222222']}
					blendMode="multiply"
					motionConfig="wobbly"
					legends={[
						{
							anchor: 'top-left',
							direction: 'column',
							translateX: -50,
							translateY: -40,
							itemWidth: 80,
							itemHeight: 20,
							itemTextColor: '#000',
							symbolSize: 12,
							symbolShape: 'circle',
							effects: [
								{
									on: 'hover',
									style: {
										itemTextColor: '#000'
									}
								}
							]
						}
					]}
				/>
			</div>


		</div>
	);
}

export default StatEdit;
