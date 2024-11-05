import { createProducer } from '@rbxts/reflex';

import type { PlayerData, PlayerSetting } from './default-data';

export type SettingState = Readonly<Record<string, PlayerSetting | undefined>>;

const initialState: SettingState = {};

export const settingSlice = createProducer(initialState, {
	/** @ignore */
	closePlayerData: (state, player: string): SettingState => {
		return {
			...state,
			[player]: undefined,
		};
	},

	/** @ignore */
	loadPlayerData: (state, player: string, data: PlayerData): SettingState => {
		return {
			...state,
			[player]: data.setting,
		};
	},

	changeSetting: (
		state,
		player: string,
		settingType: keyof PlayerSetting,
		value: PlayerSetting[keyof PlayerSetting],
	): SettingState => {
		const setting = state[player];

		return {
			...state,
			[player]: setting && {
				...setting,
				[settingType]: value,
			},
		};
	},
});
