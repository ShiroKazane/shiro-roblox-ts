import { GameId, getConfigValueForGame } from "shared/functions/game-config";

export const GamePass = {
	nothin: getConfigValueForGame({
		[GameId.Development]: "121418214359942",
		[GameId.Production]: "129135868098925",
	}),
} as const;

export type GamePass = ValueOf<typeof GamePass>;

export interface GamePassData {
	active: boolean;
}

export const Product = {
	nothin: getConfigValueForGame({
		[GameId.Development]: "2533285203",
		[GameId.Production]: "2533152713",
	}),
} as const;

export type Product = ValueOf<typeof Product>;

export interface ProductData {
	timesPurchased: number;
}
