import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import ReactRoblox from "@rbxts/react-roblox";

import { store } from "client/store";

import { RemProvider } from "../providers/rem-provider";

export function makeStory(Story: () => React.ReactNode): unknown {
	return {
		react: React,
		reactRoblox: ReactRoblox,
		story: () => {
			return (
				<StrictMode>
					<RemProvider>
						<ReflexProvider key="reflex-provider" producer={store}>
							<Story />
						</ReflexProvider>
					</RemProvider>
				</StrictMode>
			);
		},
	};
}
