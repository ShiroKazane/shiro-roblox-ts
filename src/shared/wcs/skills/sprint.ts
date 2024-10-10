/* eslint-disable ts/no-magic-numbers -- Allow magic numbers */
/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
/* eslint-disable ts/explicit-function-return-type -- Allow function return type */
import Log from "@rbxts/log";
import { HoldableSkill, SkillDecorator } from "@rbxts/wcs";

import { SpeedBoost } from "shared/wcs/statuseffects/boost";

@SkillDecorator
export class Sprint extends HoldableSkill {
	private speedBoost: SpeedBoost | undefined;

	public OnConstructServer() {
		this.SetMaxHoldTime(5);
	}

	public OnStartServer() {
		Log.Info("Sprinto Stato.");
		this.speedBoost = new SpeedBoost(this.Character);
		this.speedBoost.Start();
		this.ApplyCooldown(2);
	}

	public OnEndServer() {
		this.speedBoost?.Stop();
	}
}
