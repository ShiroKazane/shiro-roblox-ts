import type { OnStart } from '@flamework/core';
import { Controller } from '@flamework/core';
import { Players, TextChatService } from '@rbxts/services';

import { store } from 'client/store';
import { selectPlayerProfile } from 'shared/store/persistent';

@Controller({})
export class ChatPrefixController implements OnStart {
	private readonly rankPrefixMapping = new Map<string, { border: string; color: string; prefix: string }>([
		[
			'Adept',
			{
				border: '#FFAA7F',
				color: '#FFFFFF',
				prefix: 'Adept',
			},
		],
		[
			'Okyakusama',
			{
				border: '#FFAAFF',
				color: '#FFFFFF',
				prefix: '🐰',
			},
		],
		[
			'Shiro',
			{
				border: '#AAAAFF',
				color: '#FFFFFF',
				prefix: 'Shiro',
			},
		],
	]);

	/**
	 * A lifecycle event that is called when the controller is started.
	 *
	 * This method overrides the `TextChatService.OnIncomingMessage` event and
	 * adds a prefix to incoming messages based on the player's rank.
	 *
	 * The prefix is determined by the rank name, which is retrieved from the
	 * player's attribute "Rank". The rank name is used to look up the prefix
	 * information in the `rankPrefixMapping` map.
	 *
	 * The prefix information consists of three parts: the border color, the
	 * text color, and the prefix text. The prefix text is the text that is
	 * displayed before the player's name, and the border color and text color
	 * are used to style the prefix text.
	 *
	 * The prefix text is formatted as follows: `<font
	 * color="${border}">[</font><font color="${color}">${prefix}</font><font
	 * color="${border}">]</font> ${message.PrefixText}`.
	 *
	 * This method returns the modified `TextChatMessageProperties` instance.
	 */
	public onStart(): void {
		TextChatService.OnIncomingMessage = (message: TextChatMessage) => {
			const textSource = message.TextSource;
			if (!textSource) {
				return;
			}

			const properties = new Instance('TextChatMessageProperties');
			const player = Players.GetPlayerByUserId(textSource.UserId);
			if (player) {
				const state = store.getState(selectPlayerProfile(tostring(player.UserId)))?.rank;

				if (state?.name !== undefined && state.name) {
					const rankInfo = this.rankPrefixMapping.get(state.name);
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
