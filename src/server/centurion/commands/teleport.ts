import type { CommandContext } from "@rbxts/centurion";
import { CenturionType, Command, Guard, Register } from "@rbxts/centurion";

import { isAdmin } from "../utils/is-admin";

@Register()
export class Teleport {
	@Command({
		name: "teleport",
		arguments: [
			{
				name: "player",
				description: "player to teleport",
				type: CenturionType.Player,
			},
			{
				name: "destination",
				description: "player destination",
				type: CenturionType.Player,
			},
		],
		description: "teleport player to other player",
	})
	@Guard(isAdmin)
	public teleport(context: CommandContext, player: Player, destination: Player): void {
		if (player === context.executor && context.executor === destination) {
			context.error("you can't teleport yourself to yourself");
			return;
		} else if (player === destination) {
			context.error("you can't teleport player to itself");
			return;
		}

		const PlayerCharacter = player.Character ?? player.CharacterAdded.Wait()[0];
		const PlayerHumanoid = PlayerCharacter.WaitForChild("Humanoid", 10) as Humanoid;

		const DestinationCharacter = destination.Character ?? destination.CharacterAdded.Wait()[0];
		const DestinationHumanoid = DestinationCharacter.WaitForChild("Humanoid", 10) as Humanoid;

		if (PlayerHumanoid.RootPart && DestinationHumanoid.RootPart) {
			PlayerHumanoid.RootPart.CFrame = DestinationHumanoid.RootPart.CFrame;
			context.reply(`${player.Name} has been bring here`);
		} else {
			context.error("couldn't teleport, root part not found");
		}
	}

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

		const PlayerCharacter = player.Character ?? player.CharacterAdded.Wait()[0];
		const PlayerHumanoid = PlayerCharacter.WaitForChild("Humanoid", 10) as Humanoid;

		const ExecutorCharacter =
			context.executor.Character ?? context.executor.CharacterAdded.Wait()[0];
		const ExecutorHumanoid = ExecutorCharacter.WaitForChild("Humanoid", 10) as Humanoid;

		if (PlayerHumanoid.RootPart && ExecutorHumanoid.RootPart) {
			PlayerHumanoid.RootPart.CFrame = ExecutorHumanoid.RootPart.CFrame;
			context.reply(`${player.Name} has been bring here`);
		} else {
			context.error("couldn't bring, root part not found");
		}
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

		const ExecutorCharacter =
			context.executor.Character ?? context.executor.CharacterAdded.Wait()[0];
		const ExecutorHumanoid = ExecutorCharacter.WaitForChild("Humanoid", 10) as Humanoid;

		const PlayerCharacter = player.Character ?? player.CharacterAdded.Wait()[0];
		const PlayerHumanoid = PlayerCharacter.WaitForChild("Humanoid", 10) as Humanoid;

		if (ExecutorHumanoid.RootPart && PlayerHumanoid.RootPart) {
			ExecutorHumanoid.RootPart.CFrame = PlayerHumanoid.RootPart.CFrame;
			context.reply(`teleported to ${player.Name}`);
		} else {
			context.error("couldn't teleport, root part not found");
		}
	}
}
