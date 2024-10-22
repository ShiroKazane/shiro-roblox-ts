import { createProducer } from "@rbxts/reflex";

import type { Badge } from "types/enum/badge";
import type { GamePass, Product } from "types/enum/mtx";

import type { PlayerData, PlayerGames } from "./default-data";

export type GamesState = Readonly<Record<string, PlayerGames | undefined>>;

const initialState: GamesState = {};

export const gamesSlice = createProducer(initialState, {
	/** @ignore */
	closePlayerData: (state, player: string): GamesState => {
		return {
			...state,
			[player]: undefined,
		};
	},

	/** @ignore */
	loadPlayerData: (state, player: string, data: PlayerData): GamesState => {
		return {
			...state,
			[player]: data.games,
		};
	},

	/**
	 * Stores the badge status for a player.
	 *
	 * @param state - The current state.
	 * @param player - The player to award the badge to.
	 * @param badge - The badge to award.
	 * @param badgeStatus - True if the badge was successfully awarded, false if
	 *   it needs to be retried in the future.
	 * @returns The new state.
	 */
	awardBadge: (state, player: string, badge: Badge, badgeStatus: boolean): GamesState => {
		const games = state[player];
		return {
			...state,
			[player]: games && {
				...games,
				achievements: {
					badges: new Map([...games.achievements.badges]).set(badge, badgeStatus),
				},
			},
		};
	},

	purchaseDeveloperProduct: (state, player: string, productId: Product): GamesState => {
		const games = state[player];
		return {
			...state,
			[player]: games && {
				...games,
				mtx: {
					...games.mtx,
					products: new Map([...games.mtx.products]).set(productId, {
						timesPurchased:
							(games.mtx.products.get(productId)?.timesPurchased ?? 0) + 1,
					}),
				},
			},
		};
	},

	purchaseGamePass: (state, player: string, gamePassId: GamePass): GamesState => {
		const games = state[player];
		return {
			...state,
			[player]: games && {
				...games,
				mtx: {
					...games.mtx,
					gamePasses: new Map([...games.mtx.gamePasses]).set(gamePassId, {
						active: true,
					}),
				},
			},
		};
	},
});
