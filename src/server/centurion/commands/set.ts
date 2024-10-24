/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
import type { CommandContext } from "@rbxts/centurion";
import { CenturionType, Command, Group, Guard, Register } from "@rbxts/centurion";

import { store } from "server/store";
import { selectPlayerProfile } from "shared/store/persistent";

import { isAdmin } from "../utils/is-admin";

@Register({
	groups: [
		{
			name: "set",
			description: "Set something from player",
		},
	],
})
@Group("set")
export class Set {
	@Command({
		name: "koban",
		arguments: [
			{
				name: "player",
				description: "Player to set",
				type: CenturionType.Player,
			},
			{
				name: "amount",
				description: "Amount to set",
				type: CenturionType.Integer,
			},
		],
		description: "Set player koban",
	})
	@Guard(isAdmin)
	public koban(context: CommandContext, player: Player, amount: number): void {
		store.setCurrency(tostring(player.UserId), amount);
		context.reply(`${player.Name} koban has been set into ${amount}`);
	}

	@Command({
		name: "rank",
		arguments: [
			{
				name: "player",
				description: "Player to set",
				type: CenturionType.Player,
			},
			{
				name: "rank id",
				description: "Set Rank ID into",
				type: CenturionType.Integer,
			},
		],
		description: "Set player rank id",
	})
	@Guard(isAdmin)
	public rank(context: CommandContext, player: Player, id: number): void {
		const rankMapping = new Map<number, string>([
			[0, "Guest"],
			[1, "Okyakusama"],
			[254, "Adept"],
			[255, "Shiro"],
		]);

		const state = store.getState(selectPlayerProfile(tostring(player.UserId)))?.rank;
		const hasRank = rankMapping.has(id);
		const rank = rankMapping.get(id);

		if ((state && state.id > id) || player.UserId === 643925523) {
			if (hasRank && rank !== undefined && state?.id !== id) {
				store.changeProfile(tostring(player.UserId), "rank", { id, name: rank });
				context.reply(`${player.Name} rank has been set into ${rank}`);
			} else {
				context.error("Rank id not found");
			}
		}
	}
}
