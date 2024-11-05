const interFont = 'rbxassetid://12187365364';
const specialElite = 'SpecialElite';

export const fonts = {
	inter: {
		bold: new Font(interFont, Enum.FontWeight.Bold),
		medium: new Font(interFont, Enum.FontWeight.Medium),
		regular: new Font(interFont),
	},
	primary: Enum.Font.SpecialElite,
	robotoMono: {
		regular: Font.fromEnum(Enum.Font.RobotoMono),
	},
	specialElite: {
		bold: Font.fromName(specialElite, Enum.FontWeight.Bold),
		medium: Font.fromName(specialElite, Enum.FontWeight.Medium),
		regular: Font.fromName(specialElite),
	},
};
