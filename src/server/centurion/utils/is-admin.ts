import type { CommandGuard } from "@rbxts/centurion";

import { store } from "server/store";
import { CREATOR_ID } from "shared/constants";
import { selectPlayerProfile } from "shared/store/persistent";

export const isAdmin: CommandGuard = context => {
	const state = store.getState(selectPlayerProfile(tostring(context.executor.UserId)))?.rank;
	if (context.executor.UserId === CREATOR_ID) {
		return true;
	} else if (state && state.id < 254) {
		context.error("Insufficient permission!");
		return false;
	}

	return true;
};
