export const RankMap = new Map<number, string>([
	[0, 'Guest'],
	[1, 'Okyakusama'],
	[254, 'Adept'],
	[255, 'Shiro'],
]);

export type RankMap = ValueOf<typeof RankMap>;
