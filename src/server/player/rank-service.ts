/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
import { Service } from "@flamework/core";
import type { Logger } from "@rbxts/log";

import type PlayerEntity from "./player-entity";
import type { OnPlayerJoin } from "./player-service";

@Service({})
export class RankService implements OnPlayerJoin {
	private readonly groupId = 14453417;
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
		const rankName = this.getPlayerRank(player);
		this.logger.Info(`${player.Name} has the rank: ${rankName}`);

		this.setPlayerRank(player, rankName);
	}

	private getPlayerRank(player: Player): string {
		const rankId = player.GetRankInGroup(this.groupId);
		return this.rankMapping.get(rankId) ?? "Guest";
	}

	private setPlayerRank(player: Player, rankName: string): void {
		player.SetAttribute("Rank", rankName);
	}
}
