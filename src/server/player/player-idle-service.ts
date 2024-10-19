import type { OnInit } from "@flamework/core";
import { Service } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { MessagingService, Players, RunService, TeleportService } from "@rbxts/services";

import { store } from "server/store";
import { selectPlayerSettings } from "shared/store/persistent";

import { Events } from "../network";
import type PlayerEntity from "./player-entity";
import type { OnPlayerJoin } from "./player-service";

interface ServerData {
	jobId: string;
	placeId: number;
	playerCount: number;
}

const SERVER_ANNOUNCE_TOPIC = "ServerAnnounce";

@Service({})
export class PlayerIdleService implements OnInit, OnPlayerJoin {
	private readonly availablePublicServers: Array<ServerData> = [];

	constructor(private readonly logger: Logger) {}

	public onInit(): void {
		this.OnPlayerIdled();
		this.listenForPublicServers();
		this.announcePublicServer();
	}

	/**
	 * Called when a player becomes idle. If the game is not in Studio, then we
	 * teleport them back to the default spawn location.
	 */
	public OnPlayerIdled(): void {
		Events.activity.idle.connect((player: Player) => {
			if (RunService.IsStudio()) {
				return;
			}

			this.savePosition(player);
			this.teleportService(player);
		});
	}

	/**
	 * Called when a player joins the game. If the player has a stored
	 * coordinate in their settings, then we teleport them to that location.
	 *
	 * @param playerEntity - The player entity that join.
	 */
	public onPlayerJoin({ player }: PlayerEntity): void {
		const state = store.getState(selectPlayerSettings(tostring(player.UserId)));

		if (state?.position.idle !== undefined && state.position.idle) {
			const Character = player.Character ?? player.CharacterAdded.Wait()[0];
			const Humanoid = Character.WaitForChild("Humanoid", 10) as Humanoid;

			if (Humanoid.RootPart) {
				Humanoid.RootPart.CFrame = new CFrame(
					state.position.x,
					state.position.y,
					state.position.z,
				);
				store.changeSetting(tostring(player.UserId), "position", {
					idle: false,
					x: 0,
					y: 0,
					z: 0,
				});
				this.logger.Info(`Teleport ${player.Name}.`);
			}
		}
	}

	/**
	 * Saves the player's current CFrame position to their data and mark as
	 * currently idle.
	 *
	 * @param player - The player to save it's position.
	 */
	private savePosition(player: Player): void {
		const Character = player.Character ?? player.CharacterAdded.Wait()[0];
		const Humanoid = Character.WaitForChild("Humanoid", 10) as Humanoid;

		if (Humanoid.RootPart) {
			const { Position } = Humanoid.RootPart;
			store.changeSetting(tostring(player.UserId), "position", {
				idle: true,
				x: Position.X,
				y: Position.Y,
				z: Position.Z,
			});
		}
	}

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

		if (isPrivateServer) {
			this.logger.Info(`${player.Name} is in a private server.`);
			TeleportService.TeleportToPrivateServer(game.PlaceId, game.PrivateServerId, [player]);
		} else if (otherPlayers.size() > 0) {
			TeleportService.Teleport(game.PlaceId, player);
		} else {
			this.logger.Info(`${player.Name} is the only player. Teleport to a new server...`);

			const availableServer = this.availablePublicServers.find(
				server => server.jobId !== game.JobId,
			);
			if (availableServer) {
				this.logger.Info(`${player.Name} is teleport to an available public server.`);
				TeleportService.Teleport(availableServer.placeId, player, availableServer.jobId);
			} else {
				this.logger.Info(
					`${player.Name} has no public servers available. Reserving a new server...`,
				);
				const reserveServerId = TeleportService.ReserveServer(game.PlaceId);
				TeleportService.TeleportToPrivateServer(game.PlaceId, reserveServerId[0], [player]);
			}
		}
	}

	/** Listens for announcements of other public servers using MessagingService. */
	private listenForPublicServers(): void {
		MessagingService.SubscribeAsync(SERVER_ANNOUNCE_TOPIC, message => {
			const serverData = message.Data as ServerData;

			if (serverData.jobId !== game.JobId) {
				this.availablePublicServers.push(serverData);
			}
		});
	}

	/**
	 * Periodically announces this server as a public server, broadcasting its
	 * open slots.
	 */
	private announcePublicServer(): void {
		task.spawn(() => {
			while (true) {
				const playerCount = Players.GetPlayers().size();
				if (playerCount < 12) {
					const serverData: ServerData = {
						jobId: game.JobId,
						placeId: game.PlaceId,
						playerCount,
					};

					MessagingService.PublishAsync(SERVER_ANNOUNCE_TOPIC, serverData);
				}

				task.wait(60);
			}
		});
	}
}
