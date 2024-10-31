import { combineProducers } from "@rbxts/reflex";

import { guiSlice } from "./gui";

export * from "./gui";

export const clientSlice = combineProducers({
	gui: guiSlice,
});
