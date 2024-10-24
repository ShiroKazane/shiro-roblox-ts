import React from "@rbxts/react";

import { Layer } from "./components/primitive";

export function App(): React.ReactNode {
	return (
		<>
			<Layer key="shiro-layer" />

			<Layer key="shiro-layer1" />
		</>
	);
}
