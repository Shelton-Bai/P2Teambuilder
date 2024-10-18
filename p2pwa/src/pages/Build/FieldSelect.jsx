import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

function FieldSelect({ roster, currBuild, pokemonInfo, selectedField, setSelectedField }) {
	const [build, setBuild] = useState(roster[currBuild]);

	const pokemonInfoRef = useRef(null);
	const movesStatsRef = useRef(null);

	const scrollToSection = (ref) => {
		ref.current.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		setBuild(roster[currBuild])
	}, [roster, currBuild]);

	return (
		<div className='flex flex-row border-pory-red overflow-x-hidden min-h-max'>
			<div ref={pokemonInfoRef} className='min-w-full'>
				<div className='flex flex-col border-pory-blue border p-2 gap-2 rounded-xl min-w-full'>
					<div className='flex flex-row justify-between'>
						<p className='text-white text-xl'>Pokemon Info</p>
						<button className='text-white bg-pory-blue p-1 rounded-lg' onClick={() => scrollToSection(movesStatsRef)}>
							{'Go to Moves & Stats >>'}
						</button>
					</div>
					<FieldSelector field={'Species'} value={build.pokemonName} selectedField={selectedField} setSelectedField={setSelectedField}/>
					<div className='flex flex-row gap-2'>
						<FieldSelector field={'Ability'} value={build.ability} selectedField={selectedField} setSelectedField={setSelectedField}/>
						<FieldSelector field={'Item'} value={build.item} selectedField={selectedField} setSelectedField={setSelectedField}/>
					</div>
					<button className={`flex flex-col text-xl rounded-xl items-center text-white p-2 ${selectedField === 'Details' ? 'bg-pory-red' : 'bg-pory-blue'}`}
					onClick={() => {setSelectedField('Details')}}>
						Details
					</button>
				</div>
			</div>
			
			<div ref={movesStatsRef} className='min-w-full'>
				<div className='flex flex-col border-pory-blue border p-2 gap-2 rounded-xl min-w-full'>
					<div className='flex flex-row justify-between'>
						<p className='text-white text-xl'>Moves & Stats</p>
						<button className='text-white bg-pory-blue p-1 rounded-lg' onClick={() => scrollToSection(pokemonInfoRef)}>
							{'<< Go to Pokemon Info'}
						</button>
					</div>
					<div className='flex flex-row gap-2'>
						<FieldSelector field={'Move 1'} value={build.moveArray[0]} selectedField={selectedField} setSelectedField={setSelectedField}/>
						<FieldSelector field={'Move 2'} value={build.moveArray[1]} selectedField={selectedField} setSelectedField={setSelectedField}/>
					</div>
					<div className='flex flex-row gap-2'>
						<FieldSelector field={'Move 3'} value={build.moveArray[2]} selectedField={selectedField} setSelectedField={setSelectedField}/>
						<FieldSelector field={'Move 4'} value={build.moveArray[3]} selectedField={selectedField} setSelectedField={setSelectedField}/>
					</div>
					<button className={`flex flex-col text-xl rounded-xl items-center text-white p-2 ${selectedField === 'Stats' ? 'bg-pory-red' : 'bg-pory-blue'}`}
					onClick={() => {setSelectedField('Stats')}}>
						Stats
					</button>
				</div>
			</div>
				

		</div>
	);
}

const FieldSelector = ({ field, value, selectedField, setSelectedField }) => {
	const exists = value !== null && value !== "";

	return (
		<div className='flex flex-col basis-1/2'>
			<p className='text-white pl-2 text-sm'>{field}</p>
			<div className={`selectfield
				${exists ? 'text-white' : 'text-pory-blue'}
				${selectedField === field ? 'border-pory-red' : 'border-pory-blue'}`}
				onClick={() => {setSelectedField(field)}}
			>
				{exists ? value.toString() : field}
			</div>
		</div>
	);
}

export default FieldSelect;
