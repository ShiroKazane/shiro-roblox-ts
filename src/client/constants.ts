import { Players } from '@rbxts/services';

export const { LocalPlayer } = Players;

export const USER_ID = tostring(LocalPlayer.UserId);
export const USER_NAME = LocalPlayer.Name;

// biome-ignore lint/style/noNonNullAssertion: Should always be present during usage.
export const PLAYER_GUI = LocalPlayer.FindFirstChildWhichIsA('PlayerGui')!;
