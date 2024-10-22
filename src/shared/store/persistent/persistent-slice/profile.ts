import { createProducer } from "@rbxts/reflex";

import type { PlayerData, PlayerProfile } from "./default-data";

export type ProfileState = Readonly<Record<string, PlayerProfile | undefined>>;

const initialState: ProfileState = {};

export const profileSlice = createProducer(initialState, {
	/** @ignore */
	closePlayerData: (state, player: string): ProfileState => {
		return {
			...state,
			[player]: undefined,
		};
	},

	/** @ignore */
	loadPlayerData: (state, player: string, data: PlayerData): ProfileState => {
		return {
			...state,
			[player]: data.profile,
		};
	},

	changeProfile: (
		state,
		player: string,
		profileType: keyof PlayerProfile,
		value: PlayerProfile[keyof PlayerProfile],
	): ProfileState => {
		const profile = state[player];
		return {
			...state,
			[player]: profile && {
				...profile,
				[profileType]: value,
			},
		};
	},

	giveCurrency: (state, player: string, amount: number): ProfileState => {
		const profile = state[player];
		return {
			...state,
			[player]: profile && {
				...profile,
				balance: {
					currency: profile.balance.currency + amount,
				},
			},
		};
	},

	setCurrency: (state, player: string, amount: number): ProfileState => {
		const profile = state[player];
		return {
			...state,
			[player]: profile && {
				...profile,
				balance: {
					currency: amount,
				},
			},
		};
	},
});
