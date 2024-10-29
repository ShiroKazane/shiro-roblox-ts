import type { CommandContext } from "@rbxts/centurion";
import { CenturionType, Command, Group, Guard, Register } from "@rbxts/centurion";

import { store } from "server/store";

import { isAdmin } from "../utils/is-admin";

@Register({
	groups: [
		{
			name: "give",
			description: "Give player something",
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
				description: "Player to give",
				type: CenturionType.Player,
			},
			{
				name: "amount",
				description: "Amount to give",
				type: CenturionType.Integer,
			},
		],
		description: "Give koban to player",
	})
	@Guard(isAdmin)
	public give(context: CommandContext, player: Player, amount: number): void {
		store.giveCurrency(tostring(player.UserId), amount);
		context.reply(`${player.Name} has been given ${amount} koban`);
	}
}
