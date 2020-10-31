import { enumerate } from '../lazy';

/// gets the nth element of an array. Has O(n) algorithmic complexity
function nth<T>(iter: Iterable<T>, index: number) {
	if (index < 0) throw new Error('index for nth cannot be negative');

	for (const [i, item] of enumerate(iter)) {
		if (index == i) return item;
	}

	return null;
}


export default nth;
