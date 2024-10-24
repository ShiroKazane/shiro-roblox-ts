import type { CommandContext } from "@rbxts/centurion";
import { Command, Group, Guard, Register } from "@rbxts/centurion";
import { Workspace } from "@rbxts/services";

import { isAdmin } from "../utils/is-admin";

@Register({
	groups: [
		{
			name: "stats",
			description: "Show server stats",
		},
	],
})
@Group("stats")
export class Stats {
	@Command({
		name: "uptime",
		description: "Show server uptime",
	})
	@Guard(isAdmin)
	public stats(context: CommandContext): void {
		const uptime = math.floor(Workspace.DistributedGameTime);
		let time = "";
		if (uptime >= 86400) {
			time += `${math.floor(uptime / 86400)}d `;
		}

		if (uptime >= 3600) {
			time += `${math.floor((uptime % 86400) / 3600)}h `;
		}

		if (uptime >= 60) {
			time += `${math.floor((uptime % 3600) / 60)}m `;
		}

		time += `${uptime % 60}s`;
		context.reply(`<font size="18">Server uptime: <b>${time}</b></font>`);
	}
}
