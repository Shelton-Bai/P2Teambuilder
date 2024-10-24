function TeamCard({ team, onClick, onDelete }) {

	return (
		<div className='text-2xl rounded-xl bg-inherit border-pory-blue border text-white p-2 active:bg-pory-red w-full font-bold relative' onClick={onClick}>
			{team.name}
			<button className="text-sm font-normal p-1 border border-pory-blue rounded-xl absolute top-2 right-2 hover:border-pory-red"
				onClick={(e) => {
					e.stopPropagation(); onDelete();
				}}
			>
				Delete Team
			</button>
			<div className="flex flex-row flex-wrap">
				{team.roster.map((build, index) => (
					<div key={index} className="basis-1/2 text-xl font-normal truncate">
						{build.pokemonName}
					</div>
				))}

				{Array.from({ length: 6 - team.roster.length }).map((_, index) => (
					<div key={`empty-${index}`} className="basis-1/2 text-xl font-normal text-pory-red">
						Empty Slot
					</div>
				))}
			</div>

		</div>
	)
}

export default TeamCard;
