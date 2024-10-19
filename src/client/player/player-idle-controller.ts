import type { OnInit } from "@flamework/core";
import { Controller } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { Players } from "@rbxts/services";

import { Events } from "client/network";

@Controller({})
export default class IdleController implements OnInit {
	constructor(private readonly logger: Logger) {}

	public onInit(): void {
		Players.LocalPlayer.Idled.Connect(time => {
			this.OnPlayerIdled(time);
		});
	}

	/**
	 * Handles the player's Idled event. This event is fired when the player has
	 * stopped interacting with the game. The time parameter is the amount of
	 * time the player was idle for.
	 *
	 * @param time - The amount of time the player was idle for.
	 */
	public OnPlayerIdled(time: number): void {
		if (time > 1140) {
			Events.activity.idle.fire();
		}
	}
}
