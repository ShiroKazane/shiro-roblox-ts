import { createSelector } from "@rbxts/reflex";

import type { SharedState } from "..";
import type { PlayerData } from "./persistent-slice";

export function selectClientData() {
	return (state: SharedState) => state.client.gui;
}

export function selectPlayerGames(playerId: string) {
	return (state: SharedState) => state.persistent.games[playerId];
}

export function selectPlayerProfile(playerId: string) {
	return (state: SharedState) => state.persistent.profile[playerId];
}

export function selectPlayerSetting(playerId: string) {
	return (state: SharedState) => state.persistent.setting[playerId];
}

export function selectPlayerData(playerId: string): (state: SharedState) => PlayerData | undefined {
	return createSelector(
		selectPlayerGames(playerId),
		selectPlayerProfile(playerId),
		selectPlayerSetting(playerId),
		(games, profile, setting): PlayerData | undefined => {
			if (!games || !profile || !setting) {
				return undefined;
			}

			return {
				games,
				profile,
				setting,
			};
		},
	);
}
