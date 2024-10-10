/* eslint-disable ts/no-magic-numbers -- Allow magic numbers */
import { ReplicatedStorage } from "@rbxts/services";
import { CreateClient } from "@rbxts/wcs";

const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.WaitForChild("wcs", 10) as Folder);
Client.Start();
