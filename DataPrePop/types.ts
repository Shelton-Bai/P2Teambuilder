export interface BaseStats {
	hp: number;
	atk: number;
	def: number;
	spa: number;
	spd: number;
	spe: number;
}

export interface Abilities {
	0?: string;
	1?: string;
	H?: string;
}

export interface GenderRatio {
	M?: number;
	F?: number;
}

export interface PokedexEntry {
	num?: number;
	name: string;
	types: string[];
	genderRatio?: GenderRatio;
	gender?: string;
	baseStats: BaseStats;
	abilities: Abilities;
	heightm?: number;
	weightkg?: number;
	color?: string;
	evos?: string[];
	prevo?: string;
	evoLevel?: number;
	eggGroups?: string[];
	forme?: string;
	tag?: string;
}

export interface FormatDataBase {
	tier?: string;
	doublesTier?: string;
	natDexTier?: string;
	isNonstandard?: string;
}