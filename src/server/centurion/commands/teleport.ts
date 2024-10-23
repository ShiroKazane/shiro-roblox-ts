import type { CommandContext } from "@rbxts/centurion";
import { CenturionType, Command, Guard, Register } from "@rbxts/centurion";

import { isAdmin } from "../utils/is-admin";

@Register()
export class Teleport {
	@Command({
		name: "bring",
		arguments: [
			{
				name: "player",
				description: "player to bring",
				type: CenturionType.Player,
			},
		],
		description: "bring player to your location",
	})
	@Guard(isAdmin)
	public bring(context: CommandContext, player: Player): void {
		if (player === context.executor) {
			context.error("you can't bring yourself");
			return;
		}

		const PlayerRootPart = player.FindFirstChild("HumanoidRootPart") as BasePart;
		const ExecutorRootPart = context.executor.FindFirstChild("HumanoidRootPart") as BasePart;
		PlayerRootPart.CFrame = ExecutorRootPart.CFrame;
		context.reply(`${player.Name} has been bring here`);
	}

	@Command({
		name: "to",
		arguments: [
			{
				name: "player",
				description: "teleport destination",
				type: CenturionType.Player,
			},
		],
		description: "teleport to another player",
	})
	@Guard(isAdmin)
	public to(context: CommandContext, player: Player): void {
		if (player === context.executor) {
			context.error("you can't teleport to yourself");
			return;
		}

		const ExecutorRootPart = context.executor.FindFirstChild("HumanoidRootPart") as BasePart;
		const PlayerRootPart = player.FindFirstChild("HumanoidRootPart") as BasePart;
		ExecutorRootPart.CFrame = PlayerRootPart.CFrame;
		context.reply(`teleported to ${player.Name}`);
	}
}
