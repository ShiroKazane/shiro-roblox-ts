/* eslint-disable curly -- Disable curly */
/* eslint-disable ts/explicit-function-return-type -- Allow explicit function return type */
import { Players, ReplicatedStorage, UserInputService as UIS } from "@rbxts/services";
import { Character, CreateClient } from "@rbxts/wcs";

import { Sprint } from "shared/wcs/skills/sprint";

const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.TS.wcs);
Client.Start();

function getCurrentChar() {
	const currentChar = Players.LocalPlayer.Character;
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
