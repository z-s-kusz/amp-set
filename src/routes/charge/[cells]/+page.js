import { error } from '@sveltejs/kit';
import { defaultBatteries } from '$lib/default-batteries';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.cells) {
		const cellNumber = parseInt(params.cells.substring(0, 1));
		const matchingBatteries = defaultBatteries.filter((battery) => {
			return battery.cellCount === cellNumber;
		});

		return {
			batteries: matchingBatteries
		};
	}

	error(404, 'Not found');
}
