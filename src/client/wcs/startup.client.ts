import { ReplicatedStorage } from "@rbxts/services";
import { CreateClient } from "@rbxts/wcs";

const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.TS.wcs);
Client.Start();
