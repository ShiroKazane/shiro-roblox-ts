import React, { useMemo } from '@rbxts/react';

import { KobanApp } from './components/pages/koban';
import { Layer } from './components/primitive';
import { useRootSelector } from './hooks';

export function App(): React.ReactNode {
	const page = useRootSelector((state) => state.client.page);

	const appContent = useMemo(() => (page === 'Koban' ? <KobanApp /> : undefined), [page]);

	return <Layer key='MainUI'>{appContent}</Layer>;
}
