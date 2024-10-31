import React from "@rbxts/react";

import { store } from "client/store";
import { useRem, useTheme } from "client/ui/hooks";

import { Button, Frame, ScrollingFrame, TextLabel } from "../primitive";

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
			<ScrollingFrame
				key="Content"
				CanvasSize={new Vector2(0, 0)}
				Native={{
					AnchorPoint: new Vector2(0.5, 1),
					CanvasSize: new UDim2(0, 0, 1, 0),
					Position: new UDim2(0.5, 0, 0.985, 0),
					ScrollBarThickness: 0,
					Size: new UDim2(0.975, 0, 0.85, 0),
				}}
			>
				<TextLabel
					FontFace={theme.fonts.specialElite.regular}
					Native={{
						AnchorPoint: new Vector2(0.5, 0),
						BackgroundTransparency: 1,
						Position: new UDim2(0.5, 0, 0.02, 0),
						Size: new UDim2(0.925, 0, 0, rem(3.125)),
						TextXAlignment: "Left",
						TextYAlignment: "Top",
					}}
					Text="try scrolling maybe?"
					TextColor={theme.colors.text.primary}
				/>
				<TextLabel
					FontFace={theme.fonts.specialElite.regular}
					Native={{
						AnchorPoint: new Vector2(0.5, 1),
						BackgroundTransparency: 1,
						Position: new UDim2(0.5, 0, 0.99, 0),
						Size: new UDim2(0, rem(7.5), 0, rem(1.25)),
					}}
					Text="sadly nothin here"
					TextColor={theme.colors.text.primary}
					TextSize={rem(0.75)}
				/>
			</ScrollingFrame>
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
