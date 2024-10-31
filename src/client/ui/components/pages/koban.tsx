import React from "@rbxts/react";

import { store } from "client/store";
import { useRem, useTheme } from "client/ui/hooks";

import { Button, Frame, TextLabel } from "../primitive";

export function KobanApp(): React.ReactNode {
	const rem = useRem();
	const theme = useTheme();

	return (
		<Frame
			key="Koban"
			CornerRadius={new UDim(0, 8)}
			Native={{
				BackgroundColor3: theme.colors.background,
				BackgroundTransparency: 0.3,
				Size: new UDim2(0, rem(24), 0, rem(30)),
			}}
		>
			<TextLabel
				key="Title"
				FontFace={theme.fonts.specialElite.bold}
				Native={{
					Position: new UDim2(0.5, 0, 0.09, 0),
				}}
				Text="Koban"
				TextColor={theme.colors.text.primary}
				TextSize={rem(1.5)}
			/>
			<Frame
				key="Close"
				Native={{
					AnchorPoint: new Vector2(1, 0),
					BackgroundTransparency: 1,
					Position: new UDim2(1, 0, 0, 0),
					Size: new UDim2(0, rem(3.125), 0, rem(3.125)),
				}}
			>
				<Button
					Native={{
						BackgroundTransparency: 1,
						FontFace: theme.fonts.specialElite.regular,
						Size: new UDim2(0, rem(1.5), 0, rem(1.5)),
						Text: "x",
						TextColor3: theme.colors.text.primary,
						TextScaled: true,
						TextWrapped: true,
					}}
					onClick={() => {
						store.setPage(undefined);
					}}
				/>
			</Frame>
		</Frame>
	);
}
