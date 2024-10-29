import type { CommandContext } from "@rbxts/centurion";
import { CenturionType, Command, Group, Guard, Register } from "@rbxts/centurion";

import { store } from "server/store";

import { isAdmin } from "../utils/is-admin";

@Register({
	groups: [
		{
			name: "take",
			description: "Take something from player",
		},
	],
})
@Group("take")
export class Take {
	@Command({
		name: "koban",
		arguments: [
			{
				name: "player",
				description: "Player to take from",
				type: CenturionType.Player,
			},
			{
				name: "amount",
				description: "Amount to take",
				type: CenturionType.Integer,
			},
		],
		description: "Take koban from player",
	})
	@Guard(isAdmin)
	public take(context: CommandContext, player: Player, amount: number): void {
		store.takeCurrency(tostring(player.UserId), amount);
		context.reply(`${amount} has been taken from ${player.Name}`);
	}
}
