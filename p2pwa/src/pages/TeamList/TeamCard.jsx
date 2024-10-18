function TeamCard({ team, onClick }) {

	return (
		<button className='text-6xl rounded-xl bg-pory-blue text-white p-2 active:bg-pory-red w-4/5' onClick={onClick}>
			{team.name}
		</button>
	)
}

export default TeamCard;
