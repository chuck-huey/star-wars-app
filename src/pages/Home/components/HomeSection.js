import React from 'react';

import { SectionHeader } from '../../../components/SectionHeader';
import { ViewMoreButton } from './ViewButton';

export function HomeSection({ title, children }) {
	return (
		<section>
			<SectionHeader title={title} />
			{children}
			<ViewMoreButton />
		</section>
	);
}
