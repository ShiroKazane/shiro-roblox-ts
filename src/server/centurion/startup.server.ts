import { Centurion } from '@rbxts/centurion';
import { ServerScriptService } from '@rbxts/services';

const server = Centurion.server();

server.registry.load(ServerScriptService.TS.centurion.commands);
// server.registry.load(ServerScriptService.TS.centurion.types);

server.start();
