import React, { useMemo } from "@rbxts/react";

import { USER_ID } from "client/constants";
import { selectPlayerProfile } from "shared/store/persistent";

import { KobanApp } from "./components/pages/koban";
import { Layer } from "./components/primitive";
import { useRootSelector } from "./hooks";

export function App(): React.ReactNode {
	const page = useRootSelector(selectPlayerProfile(USER_ID))?.page;

	const appContent = useMemo(() => (page === "Koban" ? <KobanApp /> : undefined), [page]);

	return <Layer key="MainUI">{appContent}</Layer>;
}
