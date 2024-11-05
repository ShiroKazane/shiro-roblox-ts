import { fonts } from './fonts';
import { images } from './images';
import type { Theme } from './theme';

export const defaultTheme: Theme = {
	colors: {
		background: Color3.fromRGB(17, 17, 27),
		border: Color3.fromRGB(203, 166, 247),
		card: Color3.fromRGB(30, 30, 46),
		primary: Color3.fromRGB(203, 166, 247),
		secondary: Color3.fromRGB(180, 190, 254),
		text: {
			link: Color3.fromRGB(203, 166, 247),
			primary: Color3.fromRGB(205, 214, 244),
			secondary: Color3.fromRGB(186, 194, 222),
		},
	},
	fonts,
	images,
};
