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
				description: "Name of player to join",
				type: CenturionType.String,
			},
		],
		description: "Join to other player server",
	})
	@Guard(isAdmin)
	public join(context: CommandContext, player: string): void {
		try {
			const userId = Players.GetUserIdFromNameAsync(player);
			if (userId === 0) {
				context.error("User ID not found");
				return;
			}

			const getplayer = Players.GetPlayerByUserId(userId);
			if (getplayer === context.executor) {
				context.error("You can't join yourself—you are already here..");
				return;
			}

			const [currentInstance, err, placeId, instanceId] =
				TeleportService.GetPlayerPlaceInstanceAsync(userId);

			if (err !== "") {
				context.error(`Error fetching player's server: ${error}`);
				return;
			} else if (currentInstance) {
				context.error(`Player is already in your current server.`);
				return;
			}

			context.reply("Teleporting...");
			TeleportService.TeleportToPlaceInstance(placeId, instanceId, context.executor);
		} catch {
			context.error("Failed to retrieve player's server on teleport");
		}
	}
}
