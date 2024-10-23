/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { ContextActionService as CAS } from "@rbxts/services";

import type CharacterController from "./character/character-controller";

@Controller({})
export class RunController implements OnStart {
	private readonly maxHoldTime = 5;
	private readonly toggleSprint = (name: string, state: Enum.UserInputState): void => {
		if (name === "Sprint" && state === Enum.UserInputState.Begin) {
			this.sprint(true);
		} else if (name === "Sprint" && state === Enum.UserInputState.End) {
			this.sprint(false);
		}
	};

	private sprinting = false;

	constructor(
		private readonly logger: Logger,
		private readonly characterController: CharacterController,
	) {}

	public onStart(): void {
		const Humanoid = this.characterController.getCurrentCharacter()?.Humanoid;
		if (Humanoid) {
			CAS.BindAction("Sprint", this.toggleSprint, true, Enum.KeyCode.LeftControl);

			CAS.SetImage("Sprint", "rbxassetid://9760497816");
			CAS.SetPosition("Sprint", new UDim2(0.2, 0, 0.5, 0));
			const SprintButton = CAS.GetButton("Sprint");
			if (SprintButton !== undefined) {
				SprintButton.Size = new UDim2(0, 48, 0, 48);
			}
		}
	}

	private sprint(state: boolean): void {
		const Humanoid = this.characterController.getCurrentCharacter()?.Humanoid;
		if (!Humanoid) {
			return;
		}

		if (state) {
			this.sprinting = true;
			Humanoid.WalkSpeed = 25;
			this.logger.Debug("Sprinto stato.");

			const sprintStart = tick();
			// eslint-disable-next-line ts/no-unnecessary-condition -- it'll be false sometime
			while (this.sprinting && tick() - sprintStart < this.maxHoldTime) {
				wait(0.1);
			}

			if (tick() - sprintStart >= this.maxHoldTime) {
				this.sprint(false);
			}
		} else {
			this.sprinting = false;
			Humanoid.WalkSpeed = 16;
		}
	}
}
