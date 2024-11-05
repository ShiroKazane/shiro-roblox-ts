import React from '@rbxts/react';

import { store } from 'client/store';
import { useRem, useTheme } from 'client/ui/hooks';

import { Button, Frame, ScrollingFrame, TextLabel } from '../primitive';

export function KobanApp(): React.ReactNode {
	const rem = useRem();
	const theme = useTheme();

	const text1 =
		'	<b>Koban</b> is a traditional Japanese coin that was used during the Edo period (1603-1868). It is characterized by its oval shape and typically made of gold. Koban coins were used as currency for various transactions and were notable for their high value, which made them a popular choice for larger purchases.<br/>';
	const text2 = `	The most famous type of koban is the <b>"Koban Oban"</b>, which is a large, flat coin that often features intricate designs. The obverse side usually displays a unique emblem or symbol, while the reverse side typically has inscriptions indicating the coin's value. Koban coins played an essential role in Japan's economy, facilitating trade and commerce during a time when the country was largely isolated from foreign influences.<br/>`;
	const text3 = `	As a historical artifact, koban coins are now highly sought after by collectors and historians alike, representing a significant part of Japan's monetary history and culture. They are also often associated with the samurai class, as many samurai were paid in koban during their service.<br/>`;
	const footer = 'that was a lot of text~<br/>';

	return (
		<Frame
			key='Koban'
			CornerRadius={new UDim(0, 8)}
			Native={{
				BackgroundColor3: theme.colors.background,
				BackgroundTransparency: 0.3,
				Size: new UDim2(0, rem(24), 0, rem(30)),
			}}
		>
			<TextLabel
				key='Title'
				FontFace={theme.fonts.specialElite.bold}
				Native={{
					Position: new UDim2(0.5, 0, 0.09, 0),
				}}
				Text='Koban'
				TextColor={theme.colors.text.primary}
				TextSize={rem(1.5)}
			/>
			<ScrollingFrame
				key='Content'
				CanvasSize={new Vector2(0, 0)}
				Native={{
					AnchorPoint: new Vector2(0.5, 1),
					AutomaticCanvasSize: Enum.AutomaticSize.Y,
					Position: new UDim2(0.5, 0, 0.995, 0),
					ScrollBarThickness: 0,
					Size: new UDim2(0.975, 0, 0.85, 0),
				}}
			>
				<uilistlayout HorizontalAlignment={Enum.HorizontalAlignment.Center} />
				<TextLabel
					FontFace={theme.fonts.specialElite.regular}
					Native={{
						AnchorPoint: new Vector2(0.5, 0),
						AutomaticSize: Enum.AutomaticSize.Y,
						BackgroundTransparency: 1,
						LineHeight: 1.2,
						Position: new UDim2(0.5, 0, 0.02, 0),
						RichText: true,
						Size: new UDim2(0.925, 0, 0, 0),
						TextWrapped: true,
						TextXAlignment: 'Left',
						TextYAlignment: 'Top',
					}}
					Text={text1}
					TextColor={theme.colors.text.primary}
				/>
				<TextLabel
					FontFace={theme.fonts.specialElite.regular}
					Native={{
						AnchorPoint: new Vector2(0.5, 0),
						AutomaticSize: Enum.AutomaticSize.Y,
						BackgroundTransparency: 1,
						LineHeight: 1.2,
						Position: new UDim2(0.5, 0, 0.02, 0),
						RichText: true,
						Size: new UDim2(0.925, 0, 0, 0),
						TextWrapped: true,
						TextXAlignment: 'Left',
						TextYAlignment: 'Top',
					}}
					Text={text2}
					TextColor={theme.colors.text.primary}
				/>
				<TextLabel
					FontFace={theme.fonts.specialElite.regular}
					Native={{
						AnchorPoint: new Vector2(0.5, 0),
						AutomaticSize: Enum.AutomaticSize.Y,
						BackgroundTransparency: 1,
						LineHeight: 1.2,
						Position: new UDim2(0.5, 0, 0.02, 0),
						RichText: true,
						Size: new UDim2(0.925, 0, 0, 0),
						TextWrapped: true,
						TextXAlignment: 'Left',
						TextYAlignment: 'Top',
					}}
					Text={text3}
					TextColor={theme.colors.text.primary}
				/>
				<TextLabel
					FontFace={theme.fonts.specialElite.regular}
					Native={{
						AnchorPoint: new Vector2(0.5, 0),
						AutomaticSize: Enum.AutomaticSize.XY,
						BackgroundTransparency: 1,
						Position: new UDim2(0.5, 0, 0.02, 0),
						RichText: true,
					}}
					Text={footer}
					TextColor={theme.colors.text.primary}
					TextSize={rem(0.75)}
				/>
			</ScrollingFrame>
			<Frame
				key='Close'
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
						Text: 'x',
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
