/* eslint-disable curly -- Disable curly */
/* eslint-disable ts/explicit-function-return-type -- Allow explicit function return type */
import type { Logger } from "@rbxts/log";
import Log from "@rbxts/log";
import { ReplicatedStorage, UserInputService as UIS } from "@rbxts/services";
import { Character, CreateClient } from "@rbxts/wcs";

import CharacterController from "client/player/character/character-controller";
import { Sprint } from "shared/wcs/skills/sprint";

const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.TS.wcs);
Client.Start();

const Char = new CharacterController(Log as unknown as Logger);

function getCurrentChar() {
	const currentChar = Char.getCurrentCharacter();
	return (
		Character.GetCharacterFromInstance(currentChar as Instance) ??
		Character.CharacterCreated.Wait()[0]
	);
}

UIS.InputBegan.Connect((Input, GameProcessed) => {
	if (GameProcessed) return;

	if (Input.UserInputState !== Enum.UserInputState.Begin) return;

	if (Input.KeyCode === Enum.KeyCode.LeftControl) {
		getCurrentChar().GetSkillFromConstructor(Sprint)?.Start();
	}
});

UIS.InputEnded.Connect((Input, GameProcessed) => {
	if (GameProcessed) return;

	if (Input.KeyCode === Enum.KeyCode.LeftControl) {
		getCurrentChar().GetSkillFromConstructor(Sprint)?.End();
	}
});
