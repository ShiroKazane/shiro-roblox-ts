import type { OnInit } from "@flamework/core";
import { Service } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { Players, RunService, TeleportService } from "@rbxts/services";

import { Events } from "../network";

@Service({})
export class PlayerIdleService implements OnInit {
	constructor(private readonly logger: Logger) {}

	public onInit(): void {
		this.OnPlayerIdled();
	}

	/**
	 * Called when a player becomes idle. If the game is not in Studio, then we
	 * teleport them back to the default spawn location.
	 */
	public OnPlayerIdled(): void {
		Events.activity.idle.connect((player: Player) => {
			this.logger.Info(`${player.Name} almost disconnected. Starting teleportation..`);
			if (!RunService.IsStudio()) {
				this.teleportService(player);
			}
		});
	}

	/**
	 * Called when a player joins the game. If the player has a stored
	 * coordinate in their settings, then we teleport them to that location.
	 *
	 * @param playerEntity - The player entity that join.
	 */
	// public onPlayerJoin({ player }: PlayerEntity): void {
	// 	const Character = player.Character ?? player.CharacterAdded.Wait()[0];
	// 	const Humanoid = Character.WaitForChild('Humanoid', 10) as Humanoid;

	// 	const teleportData = player.GetJoinData().TeleportData;

	// 	if (Humanoid.RootPart && teleportData !== undefined) {
	// 		Humanoid.RootPart.CFrame = teleportData.CFrame as CFrame;

	// 		this.logger.Info(`Teleport ${player.Name}.`);
	// 	}
	// }

	/**
	 * Teleports a player to a new server, either to a private server or to a
	 * public one. If the player is in a private server, they will be teleported
	 * to that server. Otherwise, they will be teleported to a server with other
	 * players. If there are no other players, they will be teleported to a new
	 * server.
	 *
	 * @param player - The player to teleport.
	 */
	private teleportService(player: Player): void {
		const otherPlayers = Players.GetPlayers().filter(plr => plr !== player);

		const isPrivateServer = game.PrivateServerId !== "" && game.PrivateServerOwnerId !== 0;

		const Character = player.Character ?? player.CharacterAdded.Wait()[0];
		const Humanoid = Character.WaitForChild("Humanoid", 10) as Humanoid;

		if (!Humanoid.RootPart) {
			this.logger.Warn(`No RootPart found for ${player.Name}`);
			return;
		}

		const teleportOptions = new Instance("TeleportOptions");

		const components = Humanoid.RootPart.CFrame.GetComponents();
		const teleportData = {
			CFrame: components,
		};

		teleportOptions.SetTeleportData(teleportData);

		if (isPrivateServer) {
			this.logger.Info(`${player.Name} is in a private server.`);
			TeleportService.TeleportToPrivateServer(
				game.PlaceId,
				game.PrivateServerId,
				[player],
				undefined,
				teleportOptions as unknown as TeleportData,
			);
		} else if (otherPlayers.size() > 0) {
			TeleportService.Teleport(game.PlaceId, player);
		} else {
			this.logger.Info(`${player.Name} is the only player. Teleport to a new server...`);
			TeleportService.Teleport(game.PlaceId, player);
		}
	}
}
