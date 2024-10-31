export interface ClientData {
	readonly gui: ClientGui;
}

export interface ClientGui {
	readonly page: string | undefined;
}
