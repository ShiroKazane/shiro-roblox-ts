/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
import type { CommandContext } from "@rbxts/centurion";
import { CenturionType, Command, Guard, Register } from "@rbxts/centurion";
import { Players, TeleportService } from "@rbxts/services";

import { isAdmin } from "../utils/is-admin";

@Register()
export class Join {
	@Command({
		name: "join",
		arguments: [
			{
				name: "player",
				description: "Player to join",
				type: CenturionType.String,
			},
		],
		description: "Join to other player server",
	})
	@Guard(isAdmin)
	public join(context: CommandContext, player: string): void {
		const userId = Players.GetUserIdFromNameAsync(player);
		if (userId === 0) {
			context.error("User ID not found");
			return;
		}

		const getplayer = Players.GetPlayerByUserId(userId);
		if (!getplayer || getplayer === context.executor) {
			context.error("You coulnd't join to yourself? you already here..");
			return;
		}

		const place = TeleportService.GetPlayerPlaceInstanceAsync(userId)[3] as unknown as number;
		TeleportService.TeleportAsync(place, [getplayer]);
	}
}
