import { combineProducers } from "@rbxts/reflex";

import { gamesSlice } from "./games";
import { guiSlice } from "./gui";
import { profileSlice } from "./profile";
import { settingSlice } from "./setting";

export * from "./default-data";
export * from "./games";
export * from "./gui";
export * from "./profile";
export * from "./setting";

export const persistentSlice = combineProducers({
	games: gamesSlice,
	profile: profileSlice,
	setting: settingSlice,
});

export const clientSlice = combineProducers({
	gui: guiSlice,
});
