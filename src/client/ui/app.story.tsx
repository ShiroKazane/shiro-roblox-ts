import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";

import { KobanApp } from "./components/pages/koban";
import { Layer } from "./components/primitive";

export const story = CreateReactStory(
	{
		react: React,
		reactRoblox: ReactRoblox,
	},
	() => {
		return (
			<Layer key="MainUI">
				<KobanApp />
			</Layer>
		);
	},
);
