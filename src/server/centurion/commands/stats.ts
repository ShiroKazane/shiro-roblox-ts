import type { CommandContext } from "@rbxts/centurion";
import { Command, Group, Guard, Register } from "@rbxts/centurion";
import { Workspace } from "@rbxts/services";

import { isAdmin } from "../utils/is-admin";

@Register({
	groups: [
		{
			name: "stats",
			description: "show server stats",
		},
	],
})
@Group("stats")
export class Stats {
	@Command({
		name: "uptime",
		description: "show server uptime",
	})
	@Guard(isAdmin)
	public stats(context: CommandContext): void {
		context.reply(`server uptime: ${math.floor(Workspace.DistributedGameTime)}`);
	}
}
