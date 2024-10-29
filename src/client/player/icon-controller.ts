import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { Icon } from "@rbxts/topbar-plus";

import { store } from "client/store";
import { selectClientData } from "shared/store/persistent";

const Koban = new Icon();

@Controller({})
export class IconController implements OnStart {
	constructor(private readonly logger: Logger) {}

	/** @ignore */
	public onStart(): void {
		this.logger.Info(`Icon starting up!`);
		this.initializeIcon();
	}

	/** This method initializes icon. */
	private initializeIcon(): void {
		Koban.setName("Koban")
			.setLabel("Koban")
			.align("Right")
			.setTextFont(Enum.Font.SpecialElite, Enum.FontWeight.Medium, Enum.FontStyle.Normal)
			.setTextSize(14)
			.bindEvent("selected", () => {
				const currentPage = store.getState(selectClientData()).page;
				store.setPage(currentPage === "Koban" ? undefined : "Koban");
			})
			.oneClick(true);
	}
}
