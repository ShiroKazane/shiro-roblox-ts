/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
import type { CommandContext } from "@rbxts/centurion";
import { CenturionType, Command, Group, Guard, Register } from "@rbxts/centurion";

import { store } from "server/store";

import { isAdmin } from "../utils/is-admin";

@Register({
	groups: [
		{
			name: "give",
			description: "give player something",
		},
	],
})
@Group("give")
export class Give {
	@Command({
		name: "koban",
		arguments: [
			{
				name: "player",
				description: "player to give",
				type: CenturionType.Player,
			},
			{
				name: "amount",
				description: "amount to give",
				type: CenturionType.Number,
			},
		],
		description: "an koban to player",
	})
	@Guard(isAdmin)
	public give(context: CommandContext, player: Player, amount: number): void {
		store.giveCurrency(tostring(player.UserId), amount);
		context.reply(`gave ${player.Name} ${amount} koban`);
	}
}
