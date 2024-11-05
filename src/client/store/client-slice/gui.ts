import { createProducer } from '@rbxts/reflex';

export interface ClientGui {
	page: string | undefined;
}

const initialState: ClientGui = {
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
