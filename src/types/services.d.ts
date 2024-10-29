interface ReplicatedStorage extends Instance {
	rbxts_include: {
		Promise: ModuleScript;
		RuntimeLib: ModuleScript;
	} & Folder;
	TS: {
		assets: ModuleScript;
		constants: ModuleScript;
		functions: {
			"game-config": ModuleScript;
			logger: ModuleScript;
		} & Folder;
		modules: {
			"3d-sound-system": ModuleScript;
		} & Folder;
		network: ModuleScript;
		store: {
			middleware: {
				profiler: ModuleScript;
			} & Folder;
			persistent: {
				"persistent-selectors": ModuleScript;
				"persistent-slice": {
					"default-data": ModuleScript;
					games: ModuleScript;
					gui: ModuleScript;
					profile: ModuleScript;
					setting: ModuleScript;
				} & ModuleScript;
			} & ModuleScript;
		} & ModuleScript;
		util: {
			"core-call": ModuleScript;
			"flamework-util": ModuleScript;
			"physics-util": ModuleScript;
			"player-util": ModuleScript;
		} & Folder;
	} & Folder;
	"TS-types": {
		enum: {
			badge: ModuleScript;
			mtx: ModuleScript;
			tag: ModuleScript;
		} & Folder;
		interfaces: Folder;
		util: Folder;
	} & Folder;
}

interface ServerScriptService {
	TS: {
		centurion: {
			commands: Folder;
			types: Folder;
		} & Folder;
		"mtx-service": ModuleScript;
		network: ModuleScript;
		player: {
			character: {
				"character-service": ModuleScript;
			} & Folder;
			data: {
				"player-data-service": ModuleScript;
				"validate-data": ModuleScript;
			} & Folder;
			"leaderstats-service": ModuleScript;
			"player-badge-service": ModuleScript;
			"player-entity": ModuleScript;
			"player-idle-service": ModuleScript;
			"player-removal-service": ModuleScript;
			"player-service": ModuleScript;
			"rank-service": ModuleScript;
			"with-player-entity": ModuleScript;
		} & Folder;
		runtime: Script;
		store: {
			middleware: {
				broadcaster: ModuleScript;
			} & Folder;
		} & ModuleScript;
	} & Folder;
}

interface Workspace {
	Baseplate: Part;
}
