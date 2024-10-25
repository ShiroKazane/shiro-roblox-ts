import { RunService } from "@rbxts/services";

export const GAME_NAME = "Shiro";
export const GROUP_ID = 14453417;
export const CREATOR_ID = game.CreatorId;

export const IS_EDIT = RunService.IsStudio() && !RunService.IsRunning();
