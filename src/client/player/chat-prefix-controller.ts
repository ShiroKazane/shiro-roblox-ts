/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";
import { Players, TextChatService } from "@rbxts/services";

@Controller({})
export class ChatPrefixController implements OnStart {
	private readonly rankPrefixMapping = new Map<
		string,
		{ border: string; color: string; prefix: string }
	>([
		[
			"Adept",
			{
				border: "#FFAA7F",
				color: "#FFFFFF",
				prefix: "Adept",
			},
		],
		[
			"Okyakusama",
			{
				border: "#FFAAFF",
				color: "#FFFFFF",
				prefix: "🐰",
			},
		],
		[
			"Shiro",
			{
				border: "#AAAAFF",
				color: "#FFFFFF",
				prefix: "Shiro",
			},
		],
	]);

	public onStart(): void {
		TextChatService.OnIncomingMessage = (message: TextChatMessage) => {
			const textSource = message.TextSource;
			if (!textSource) {
				return;
			}

			const properties = new Instance("TextChatMessageProperties");
			const player = Players.GetPlayerByUserId(textSource.UserId);
			if (player) {
				const rankName = player.GetAttribute("Rank") as string | undefined;
				if (rankName !== undefined) {
					const rankInfo = this.rankPrefixMapping.get(rankName);
					if (rankInfo) {
						const { border, color, prefix } = rankInfo;
						properties.PrefixText = `<font color="${border}">[</font><font color="${color}">${prefix}</font><font color="${border}">]</font> ${message.PrefixText}`;
					}
				}
			}

			return properties;
		};
	}
}
