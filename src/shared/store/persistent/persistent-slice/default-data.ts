import type { Badge } from 'types/enum/badge';
import type { GamePass, GamePassData, Product, ProductData } from 'types/enum/mtx';

export interface PlayerData {
	readonly games: PlayerGames;
	readonly profile: PlayerProfile;
	readonly setting: PlayerSetting;
}

export interface PlayerGames {
	readonly achievements: {
		badges: Map<Badge, boolean>;
	};
	readonly mtx: {
		gamePasses: Map<GamePass, GamePassData>;
		products: Map<Product, ProductData>;
		receiptHistory: Array<string>;
	};
}

export interface PlayerProfile {
	readonly balance: {
		currency: number;
	};
	readonly position: {
		idle: boolean;
		x: number;
		y: number;
		z: number;
	};
	readonly rank: {
		id: number;
		name: string;
	};
}

export interface PlayerSetting {
	readonly musicVolume: number;
	readonly sfxVolume: number;
}

export type PlayerSettingType = keyof PlayerSetting;

export const defaultPlayerData: PlayerData = {
	games: {
		achievements: {
			badges: new Map<Badge, boolean>(),
		},
		mtx: {
			gamePasses: new Map<GamePass, GamePassData>(),
			products: new Map<Product, ProductData>(),
			receiptHistory: [],
		},
	},
	profile: {
		balance: {
			currency: 0,
		},
		position: {
			idle: false,
			x: 0,
			y: 0,
			z: 0,
		},
		rank: {
			id: 0,
			name: 'Guest',
		},
	},
	setting: {
		musicVolume: 0.5,
		sfxVolume: 0.5,
	},
};
