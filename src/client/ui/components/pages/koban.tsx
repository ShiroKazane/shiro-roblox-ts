import React, { memo } from "@rbxts/react";

import { useRem } from "client/ui/hooks";

import { Frame, TextLabel } from "../primitive";

const KobanContent = memo(() => {
	const rem = useRem();
	return (
		<Frame
			key="Koban"
			CornerRadius={new UDim(0, 8)}
			Native={{
				BackgroundColor3: new Color3(0, 0, 0),
				BackgroundTransparency: 0.3,
				Size: new UDim2(0, rem(24), 0, rem(30)),
			}}
		>
			<TextLabel
				Native={{
					FontFace: new Font("SpecialElite", Enum.FontWeight.Bold, Enum.FontStyle.Normal),
					Position: new UDim2(0.5, 0, 0.09, 0),
				}}
				Text="Koban"
				TextColor={new Color3(255, 255, 255)}
				TextSize={rem(1.5)}
			/>
		</Frame>
	);
});

export function KobanApp(): React.ReactNode {
	return <KobanContent />;
}
