/* eslint-disable ts/no-non-null-assertion -- Allow non null assertion */
/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
/* eslint-disable ts/no-magic-numbers -- Allow magic numbers */

import { ReplicatedStorage } from "@rbxts/services";
import { Character, CreateServer } from "@rbxts/wcs";

import { onCharacterAdded, onPlayerAdded } from "shared/util/player-util";
import Normal from "shared/wcs/movesets/normal";

const Server = CreateServer();
Server.RegisterDirectory(ReplicatedStorage.WaitForChild("wcs", 10)!);
Server.Start();

onPlayerAdded(player => {
	onCharacterAdded(player, character => {
		const MovesChar = new Character(character);
		MovesChar.ApplySkillsFromMoveset(Normal);

		const humanoid = character.WaitForChild("Humanoid", 10) as Humanoid;
		humanoid.Died.Once(() => {
			MovesChar.Destroy();
		});
	});
});
