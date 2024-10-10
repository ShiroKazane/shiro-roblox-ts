import { GameId, getConfigValueForGame } from "shared/functions/game-config";

export const Badge = {
	Welcome: getConfigValueForGame({
		[GameId.Production]: "621961944671181",
	}),
} as const;

export type Badge = ValueOf<typeof Badge>;
