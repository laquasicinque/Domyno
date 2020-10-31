import { enumerate } from './index';
import type { hofFunc } from '../..';

/// Like filtering, but stopping execution when reaching a false value
function takeWhile<T>(boolFunc: hofFunc<T, boolean>) {
	return function*(iter: Iterable<T>): Iterable<T> {
		for (const [index, item] of enumerate(iter)) {
			if (!boolFunc(item, index)) return;

			yield item;
		}
	};
}

export default takeWhile;
