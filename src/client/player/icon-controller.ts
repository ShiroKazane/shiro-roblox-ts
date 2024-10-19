/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";
import { Icon } from "@rbxts/topbar-plus";

const Koban = new Icon();

@Controller({})
export class ChatPrefixController implements OnStart {
	public onStart(): void {
		Koban.setName("Koban")
			.setLabel("Koban")
			.align("Right")
			.setTextFont(Enum.Font.SpecialElite, Enum.FontWeight.Medium, Enum.FontStyle.Normal)
			.setTextSize(14)
			.oneClick(true);
	}
}
