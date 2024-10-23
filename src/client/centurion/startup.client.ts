import { Centurion } from "@rbxts/centurion";
import { CenturionUI, DefaultPalette } from "@rbxts/centurion-ui";
import Log from "@rbxts/log";
import { Players } from "@rbxts/services";

const state = Players.LocalPlayer.GetRankInGroup(14453417);
if (state >= 254) {
	Centurion.client()
		.start()
		.then(() => {
			CenturionUI.start(Centurion.client(), {
				backgroundTransparency: 0.3,
				hideOnLostFocus: false,
				palette: DefaultPalette.frappe,
				size: new UDim2(0.65, 0, 1, 0),
			});
			Log.Info("Terminal starting up!");
		})
		.catch(err => {
			Log.Warn("Failed to start Centurion:", err);
		});
}
