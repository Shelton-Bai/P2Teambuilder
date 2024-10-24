import { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import { Switch, TextField, Label, Input, NumberField, Group, Button, ComboBox, ListBox, ListBoxItem, RadioGroup, Radio, Popover, Meter, Slider, SliderOutput, SliderThumb, SliderTrack, ToggleButton } from 'react-aria-components';

const apiUrl = import.meta.env.VITE_API_URL;

function StatEdit({ roster, setRoster, currBuild, pokemonInfo }) {
	const [evs, setEvs] = useState(roster[currBuild].evArray || [0, 0, 0, 0, 0, 0]);
	const [ivs, setIvs] = useState(roster[currBuild].ivArray || [31, 31, 31, 31, 31, 31]);
	const [nature, setNature] = useState(roster[currBuild].nature || 'Quirky');

	const [display, setDisplay] = useState(true);

	const level = roster[currBuild].level;

	const setDetail = (key, value) => {
		const updatedRoster = [...roster];
		updatedRoster[currBuild] = {
			...updatedRoster[currBuild],
			[key]: value
		};
		setRoster(updatedRoster);
	}

	const setEv = (index, value) => {
		const updated = [...evs];
		updated[index] = value;
		setEvs(updated);
	}

	const setIv = (index, value) => {
		const updated = [...ivs];
		updated[index] = value;
		setIvs(updated);
	}

	useEffect(() => {
		setDetail('evArray', evs);
	}, [evs])

	useEffect(() => {
		setDetail('ivArray', ivs);
	}, [ivs])

	return (
		<div className='flex flex-col border-pory-blue border rounded-xl p-2 text-white gap-1 lg:gap-2 h-full overflow-auto'>
			<p className='flex text-xl'>Stats</p>
			

			<Meter
				value={evs[0]}
				formatOptions={Intl.NumberFormat()}
				minValue={0}
				maxValue={252}
			>
				{({ percentage, valueText }) => (
					<div>
						<Label>HP: {valueText}</Label>
						<div className="bar">
							<div className="fill" style={{ width: percentage + '%' }} />
						</div>
					</div>
				)}
			</Meter>
			<Meter
				value={evs[1]}
				formatOptions={Intl.NumberFormat()}
				minValue={0}
				maxValue={252}
			>
				{({ percentage, valueText }) => (
					<div>
						<Label>Attack: {valueText}</Label>
						<div className="bar">
							<div className="fill" style={{ width: percentage + '%' }} />
						</div>
					</div>
				)}
			</Meter>
			<Meter
				value={evs[2]}
				formatOptions={Intl.NumberFormat()}
				minValue={0}
				maxValue={252}
			>
				{({ percentage, valueText }) => (
					<div>
						<Label>Defense: {valueText}</Label>
						<div className="bar">
							<div className="fill" style={{ width: percentage + '%' }} />
						</div>
					</div>
				)}
			</Meter>
			<Meter
				value={evs[3]}
				formatOptions={Intl.NumberFormat()}
				minValue={0}
				maxValue={252}
			>
				{({ percentage, valueText }) => (
					<div>
						<Label>Special Attack: {valueText}</Label>
						<div className="bar">
							<div className="fill" style={{ width: percentage + '%' }} />
						</div>
					</div>
				)}
			</Meter>
			<Meter
				value={evs[4]}
				formatOptions={Intl.NumberFormat()}
				minValue={0}
				maxValue={252}
			>
				{({ percentage, valueText }) => (
					<div>
						<Label>Special Defense: {valueText}</Label>
						<div className="bar">
							<div className="fill" style={{ width: percentage + '%' }} />
						</div>
					</div>
				)}
			</Meter>
			<Meter
				value={evs[5]}
				formatOptions={Intl.NumberFormat()}
				minValue={0}
				maxValue={252}
			>
				{({ percentage, valueText }) => (
					<div>
						<Label>Speed: {valueText}</Label>
						<div className="bar">
							<div className="fill" style={{ width: percentage + '%' }} />
						</div>
					</div>
				)}
			</Meter>

			<p>{nature.toString()} nature</p>

			<StatPanel statName='HP' evs={evs} ivs={ivs} nature={nature} index={0} setEv={setEv} setIv={setIv} setNature={setNature} setDetail={setDetail}/>
			<StatPanel statName='Atk' evs={evs} ivs={ivs} nature={nature} index={1} setEv={setEv} setIv={setIv} setNature={setNature} setDetail={setDetail}/>
			<StatPanel statName='Def' evs={evs} ivs={ivs} nature={nature} index={2} setEv={setEv} setIv={setIv} setNature={setNature} setDetail={setDetail}/>
			<StatPanel statName='SpA' evs={evs} ivs={ivs} nature={nature} index={3} setEv={setEv} setIv={setIv} setNature={setNature} setDetail={setDetail} />
			<StatPanel statName='SpD' evs={evs} ivs={ivs} nature={nature} index={4} setEv={setEv} setIv={setIv} setNature={setNature} setDetail={setDetail} />
			<StatPanel statName='Spe' evs={evs} ivs={ivs} nature={nature} index={5} setEv={setEv} setIv={setIv} setNature={setNature} setDetail={setDetail} />



		</div>
	);
}

const StatPanel = ({ statName, evs, ivs, nature, index, setEv, setIv, setNature, setDetail }) => {
	const natureStatMap = {
		Adamant: [1, 3],
		Brave: [1, 5],
		Lonely: [1, 2],
		Naughty: [1, 4],
		Bold: [2, 1],
		Relaxed: [2, 5],
		Impish: [2, 3],
		Lax: [2, 4],
		Modest: [3, 1],
		Mild: [3, 2],
		Quiet: [3, 5],
		Rash: [3, 4],
		Calm: [4, 1],
		Gentle: [4, 2],
		Sassy: [4, 5],
		Careful: [4, 3],
		Timid: [5, 1],
		Hasty: [5, 2],
		Jolly: [5, 3],
		Naive: [5, 4],
		Quirky: [4, 4],
		Hardy: [1, 1],
		Serious: [5, 5],
		Docile: [2, 2],
		Bashful: [3, 3],
	};

	const getNatureArray = (nature) => {
		return natureStatMap[nature] || natureStatMap['Quirky'];
	}

	const [natureArray, setNatureArray] = useState(getNatureArray(nature));

	const findNature = (nArray) => {
		for (const [natureName, stats] of Object.entries(natureStatMap)) {
			if (stats[0] === nArray[0] && stats[1] === nArray[1]) {
				return natureName;
			}
		}
		return 'Quirky';
	};

	const changeNature = (stat, natureIndex) => {
		const updated = [...natureArray];
		updated[natureIndex] = stat;
		setNatureArray(updated);
		setNature(findNature(updated));
	}

	useEffect(() => {
		setNatureArray(getNatureArray(nature));
		setDetail('nature', nature);
	}, [nature])

	return (
		<div className='flex flex-col'>
			<p className='text-xl'>{statName}</p>
			<div className='flex flex-col gap-1 px-1'>
				<NumberField
					value={evs[index]}
					onChange={(value) => {
						setEv(index, value);
					}}
					minValue={0}
					maxValue={252}
					className={'flex flex-col w-full'}
					formatOptions={{
						minimumIntegerDigits: 3
					}}
				>
					<div className='flex flex-row items-center'>
						<Label className='text-base flex w-1/12'>EVs</Label>

						<Group className={''}>
							<Button slot="decrement" className={'bg-inherit border-pory-blue border-y-2 border-l-2 px-2 py-1 font-extrabold rounded-l-xl text-pory-blue pressed:text-white disabled:text-pory-red'}>–</Button>
							<Input className={'bg-inherit border-pory-blue border-2 px-2 py-1 w-12 text-center'} />
							<Button slot="increment" className={'bg-inherit border-pory-blue border-y-2 border-r-2 px-2 py-1 font-extrabold rounded-r-xl text-pory-blue pressed:text-white disabled:text-pory-red'}>+</Button>
						</Group>

						<Slider
							value={evs[index]}
							minValue={0}
							maxValue={252}
							onChange={(value) => {
								setEv(index, value);
							}}
							className={'w-1/2 ml-4'}
							aria-label='ev-slider'
						>
							<SliderTrack className={'group col-span-2 orientation-horizontal:h-6 flex items-center'}>
								<div className='rounded-full w-full h-1 bg-pory-blue' />
								<SliderThumb className={'w-4 h-4 group-orientation-horizontal:mt-4 rounded-full bg-white border-4 border-pory-blue'} />
							</SliderTrack>
						</Slider>
					</div>
				</NumberField>

				<NumberField
					value={ivs[index]}
					onChange={(value) => {
						setIv(index, value);
					}}
					minValue={0}
					maxValue={31}
					className={'flex flex-col'}
					formatOptions={{
						minimumIntegerDigits: 2
					}}
				>
					<div className='flex flex-row items-center'>
						<Label className='text-base flex w-1/12'>IVs</Label>
						<Group className={'flex'}>
							<Button slot="decrement" className={'bg-inherit border-pory-blue border-y-2 border-l-2 px-2 py-1 font-extrabold rounded-l-xl text-pory-blue pressed:text-white disabled:text-pory-red'}>–</Button>
							<Input className={'bg-inherit border-pory-blue border-2 px-2 py-1 w-12 text-center'} />
							<Button slot="increment" className={'bg-inherit border-pory-blue border-y-2 border-r-2 px-2 py-1 font-extrabold rounded-r-xl text-pory-blue pressed:text-white disabled:text-pory-red'}>+</Button>
						</Group>

						{statName !== 'HP' && (
							<div className='flex flex-row w-1/2 ml-4 gap-2 items-center'>
								<p className='text-lg'>Nature Boost:</p>

								<button
									className={`${natureArray[0] === index ? 'bg-pory-red' : 'bg-pory-blue'} rounded-xl p-1 font-extrabold px-2 text-lg`}
									onClick={() => changeNature(index, 0)}
								>
									+
								</button>

								<button
									className={`${natureArray[1] === index ? 'bg-pory-red' : 'bg-pory-blue'} rounded-xl p-1 font-extrabold px-2 text-lg`}
									onClick={() => changeNature(index, 1)}
								>
									–
								</button>
							</div>
						)}



					</div>

				</NumberField>
			</div>

		</div>
	)
}

export default StatEdit;
