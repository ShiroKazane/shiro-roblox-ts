/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { ContextActionService as CAS, UserInputService as UIS } from "@rbxts/services";

import type CharacterController from "./character/character-controller";

@Controller({})
export class RunController implements OnStart {
	private readonly maxHoldTime = 5;
	private sprinting = false;

	constructor(
		private readonly logger: Logger,
		private readonly characterController: CharacterController,
	) {}

	public onStart(): void {
		const Humanoid = this.characterController.getCurrentCharacter()?.Humanoid;
		if (Humanoid) {
			UIS.InputBegan.Connect((Input, GameProcessed) => {
				if (GameProcessed) {
					return;
				}

				if (Input.KeyCode === Enum.KeyCode.LeftShift) {
					this.sprint(true);
					this.logger.Debug("Sprinto stato.");
				}
			});

			UIS.InputEnded.Connect((Input, GameProcessed) => {
				if (GameProcessed) {
					return;
				}

				if (Input.KeyCode === Enum.KeyCode.LeftShift) {
					this.sprint(false);
				}
			});

			CAS.BindAction(
				"Sprint",
				(_name, state) => {
					if (state === Enum.UserInputState.Begin) {
						this.sprint(true);
					} else {
						this.sprint(false);
					}
				},
				true,
				Enum.KeyCode.LeftShift,
			);

			CAS.SetTitle("Sprint", "Fuck");
			CAS.SetPosition("Sprint", new UDim2(0.2, 0, 0.5, 0));
			const SprintButton = CAS.GetButton("Sprint");
			if (SprintButton !== undefined) {
				SprintButton.Size = new UDim2(0, 16, 0, 16);
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
