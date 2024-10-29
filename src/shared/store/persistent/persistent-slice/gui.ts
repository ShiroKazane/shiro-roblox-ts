import { createProducer } from "@rbxts/reflex";

export interface GuiState {
	page: string | undefined;
}

const initialState: GuiState = {
	page: undefined,
};

export const guiSlice = createProducer(initialState, {
	setPage: (state, page: string | undefined) => {
		return {
			...state,
			page,
		};
	},
});
