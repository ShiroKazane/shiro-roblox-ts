import type { OnInit } from "@flamework/core";
import { Service } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { MessagingService, Players, RunService, TeleportService } from "@rbxts/services";

import { store } from "server/store";
import { selectPlayerProfile } from "shared/store/persistent";

import { Events } from "../network";
import type PlayerEntity from "./player-entity";
import type { OnPlayerJoin } from "./player-service";

interface ServerData {
	jobId: string;
	placeId: number;
	playerCount: number;
}

const SERVER_PING_TOPIC = "ServerPing";

@Service({})
export class PlayerIdleService implements OnInit, OnPlayerJoin {
	private readonly publicServers: Array<ServerData> = [];

	constructor(private readonly logger: Logger) {}

	public onInit(): void {
		this.OnPlayerIdled();
		this.listenPing();
		this.pingServer();
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

			this.logger.Info(`${player.Name} almost disconnected. Starting teleportation..`);
			this.savePosition(player);
			this.teleportService(player);
		});
	}

	/**
	 * Called when a player joins the game. If the player has a stored
	 * coordinate in their profile, then we teleport them to that location.
	 *
	 * @param playerEntity - The player entity that join.
	 */
	public onPlayerJoin({ player }: PlayerEntity): void {
		const state = store.getState(selectPlayerProfile(tostring(player.UserId)))?.position;

		if (state?.idle !== undefined && state.idle) {
			const Character = player.Character ?? player.CharacterAdded.Wait()[0];
			const Humanoid = Character.WaitForChild("Humanoid", 10) as Humanoid;

			if (Humanoid.RootPart) {
				Humanoid.RootPart.CFrame = new CFrame(state.x, state.y, state.z);
				store.changeProfile(tostring(player.UserId), "position", {
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
			store.changeProfile(tostring(player.UserId), "position", {
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

		if (this.isPrivateServer()) {
			this.logger.Info(`${player.Name} is in a private server.`);
			TeleportService.TeleportToPrivateServer(game.PlaceId, game.PrivateServerId, [player]);
		} else if (otherPlayers.size() > 0) {
			TeleportService.Teleport(game.PlaceId, player);
		} else {
			this.logger.Info(`${player.Name} is the only player. Teleport to a new server...`);

			const availableServer = this.publicServers.find(server => server.jobId !== game.JobId);
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
	private listenPing(): void {
		if (this.isPrivateServer()) {
			return;
		}

		MessagingService.SubscribeAsync(SERVER_PING_TOPIC, message => {
			const serverData = message.Data as ServerData;

			if (serverData.jobId !== game.JobId) {
				this.publicServers.push(serverData);
			}
		});
	}

	/**
	 * Periodically announces this server as a public server, broadcasting its
	 * open slots.
	 */
	private pingServer(): void {
		if (this.isPrivateServer()) {
			return;
		}

		task.spawn(() => {
			while (true) {
				const playerCount = Players.GetPlayers().size();
				if (playerCount < 12) {
					const serverData: ServerData = {
						jobId: game.JobId,
						placeId: game.PlaceId,
						playerCount,
					};

					MessagingService.PublishAsync(SERVER_PING_TOPIC, serverData);
				}

				task.wait(60);
			}
		});
	}

	/** @ignore */
	private isPrivateServer(): boolean {
		return game.PrivateServerId !== "" && game.PrivateServerOwnerId !== 0;
	}
}
