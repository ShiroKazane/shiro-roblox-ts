import { Service } from "@flamework/core";
import type { Logger } from "@rbxts/log";

import { store } from "server/store";
import { GROUP_ID } from "shared/constants";

import type PlayerEntity from "./player-entity";
import type { OnPlayerJoin } from "./player-service";

@Service({})
export class RankService implements OnPlayerJoin {
	private readonly rankMapping = new Map<number, string>([
		[0, "Guest"],
		[1, "Okyakusama"],
		[254, "Adept"],
		[255, "Shiro"],
	]);

	constructor(private readonly logger: Logger) {}

	/**
	 * Called when a player joins the game. This method gets the player's rank
	 * in the group and sets their rank attribute accordingly.
	 *
	 * @param playerEntity - The player entity that joined the game.
	 */
	public onPlayerJoin({ player }: PlayerEntity): void {
		const rank = this.getPlayerRank(player);
		this.logger.Info(`${player.Name} has the rank: ${rank.name} [${rank.id}]`);

		store.changeProfile(tostring(player.UserId), "rank", rank);
	}

	private getPlayerRank(player: Player): { id: number; name: string } {
		const rankId = player.GetRankInGroup(GROUP_ID);
		return { id: rankId, name: this.rankMapping.get(rankId) ?? "Guest" };
	}
}
