/* eslint-disable ts/no-magic-numbers -- Allow magic number */
/* eslint-disable ts/explicit-function-return-type -- Allow function return type */
import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export class SpeedBoost extends StatusEffect {
	public OnStartServer() {
		this.SetHumanoidData({ WalkSpeed: [25, "Set"] });
	}
}
