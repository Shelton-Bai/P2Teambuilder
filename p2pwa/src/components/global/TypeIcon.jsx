import normal from '../../assets/types/normal.svg';
import fire from '../../assets/types/fire.svg';
import water from '../../assets/types/water.svg';
import electric from '../../assets/types/electric.svg';
import grass from '../../assets/types/grass.svg';
import ice from '../../assets/types/ice.svg';
import fighting from '../../assets/types/fighting.svg';
import poison from '../../assets/types/poison.svg';
import ground from '../../assets/types/ground.svg';
import flying from '../../assets/types/flying.svg';
import psychic from '../../assets/types/psychic.svg';
import bug from '../../assets/types/bug.svg';
import rock from '../../assets/types/rock.svg';
import ghost from '../../assets/types/ghost.svg';
import dragon from '../../assets/types/dragon.svg';
import dark from '../../assets/types/dark.svg';
import steel from '../../assets/types/steel.svg';
import fairy from '../../assets/types/fairy.svg';

function TypeIcon({ type }) {
	const getIcon = (type) => {
		switch (type.toLowerCase()) {
			case 'normal':
				return normal;
			case 'fire':
				return fire;
			case 'water':
				return water;
			case 'electric':
				return electric;
			case 'grass':
				return grass;
			case 'ice':
				return ice;
			case 'fighting':
				return fighting;
			case 'poison':
				return poison;
			case 'ground':
				return ground;
			case 'flying':
				return flying;
			case 'psychic':
				return psychic;
			case 'bug':
				return bug;
			case 'rock':
				return rock;
			case 'ghost':
				return ghost;
			case 'dragon':
				return dragon;
			case 'dark':
				return dark;
			case 'steel':
				return steel;
			case 'fairy':
				return fairy;
			default:
				return normal;
		}
	}

	const getColor = (type) => {
		switch (type.toLowerCase()) {
			case 'normal':
				return 'bg-typecolor-normal';
			case 'fire':
				return 'bg-typecolor-fire';
			case 'water':
				return 'bg-typecolor-water';
			case 'electric':
				return 'bg-typecolor-electric';
			case 'grass':
				return 'bg-typecolor-grass';
			case 'ice':
				return 'bg-typecolor-ice';
			case 'fighting':
				return 'bg-typecolor-fighting';
			case 'poison':
				return 'bg-typecolor-poison';
			case 'ground':
				return 'bg-typecolor-ground';
			case 'flying':
				return 'bg-typecolor-flying';
			case 'psychic':
				return 'bg-typecolor-psychic';
			case 'bug':
				return 'bg-typecolor-bug';
			case 'rock':
				return 'bg-typecolor-rock';
			case 'ghost':
				return 'bg-typecolor-ghost';
			case 'dragon':
				return 'bg-typecolor-dragon';
			case 'dark':
				return 'bg-typecolor-dark';
			case 'steel':
				return 'bg-typecolor-steel';
			case 'fairy':
				return 'bg-typecolor-fairy';
			default:
				return 'bg-typecolor-normal';
		}
	}

	const iconPath = getIcon(type);

	return (
		<div className={`${getColor(type)} aspect-square rounded-full flex items-center justify-center h-full`}>
			<img
				src={iconPath}
				alt={type}
				className='h-2/3'
			/>
		</div>

	);
}

export default TypeIcon;