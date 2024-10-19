/* eslint-disable @cspell/spellchecker -- Disable spellchecker */
import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { Icon } from "@rbxts/topbar-plus";

const Koban = new Icon();

@Controller({})
export class IconController implements OnStart {
	constructor(private readonly logger: Logger) {}

	public onStart(): void {
		this.logger.Info(`Setup icon..`);

		Koban.setName("Koban")
			.setLabel("Koban")
			.align("Right")
			.setTextFont(Enum.Font.SpecialElite, Enum.FontWeight.Medium, Enum.FontStyle.Normal)
			.setTextSize(14)
			.oneClick(true);
	}
}
