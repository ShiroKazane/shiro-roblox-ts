import style, { GLOB_TS } from "@isentinel/eslint-config";

export default style(
	{
		perfectionist: {
			customClassGroups: [
				"onInit",
				"onStart",
				"onPlayerJoin",
				"onPlayerLeave",
				"onRender",
				"onPhysics",
				"onTick",
			],
		},
		react: true,
		rules: {
			"max-lines-per-function": "off",
			"perfectionist/sort-objects": [
				"warn",
				{
					customGroups: {
						id: "id",
						name: "name",
						reactProps: ["children", "ref"],
						reflex: ["loadPlayerData", "closePlayerData"],
					},
					groups: ["id", "name", "reflex", "unknown", "reactProps"],
					order: "asc",
					partitionByComment: "Part:**",
					type: "natural",
				},
			],
		},
		typescript: {
			parserOptions: {
				project: "tsconfig.build.json",
			},
			tsconfigPath: "tsconfig.build.json",
		},
	},
	{
		files: [GLOB_TS],
		rules: {
			"no-param-reassign": "error",
			"ts/no-magic-numbers": "off",
		},
	},
);
