import { flat, entries } from './lazy'
import { hofFunc } from '../main'

/// basic utility function to combine 2 Iterables. It exits when one runs out of output,
/// regardless of the state of the other one.
export function* zip(...iters: Iterable<any>[]): Iterable<any[]> {
	// Using raw iterator protocol since for loops can be frustrating
	const rawIters = iters.map((iter) => iter[Symbol.iterator]());

	// values gained from rawIters
	const items = rawIters.map((iter) => iter.next());

	// while no item is done i.e. it has more output
	while (items.every((item) => !item.done)) {
		yield items.map((item) => item.value);

		// moving iterators down to the next element
		for (let i = 0; i < items.length; i++) {
			items[i] = rawIters[i].next();
		}
	}
}


interface NestedObject<T> {
	[value: string]: NestedObject<T> | T;
}

/// allows iterating through structures that are deeply nested, such as Linked Lists
/// atm it's rather messy since there isn't a good way to write this out with generics,
/// so a hand-made one, specific for a situation, is probably better.
export function* iterableFromNested<T>(iterObj: NestedObject<T>, nestProp: string): Iterable<NestedObject<T>> {
	// making a copy so that we don't mutate the original object
	let mutIterObj = iterObj;

	// check that next nest exists i.e. it's not null or undefined
	while (mutIterObj) {
		yield mutIterObj;

		// move mutIterObj down one nesting level
		mutIterObj = mutIterObj[nestProp] as NestedObject<T>;
	}
}


/// chains iterables, one after the other. The code is identical to flatten.
export function* chain(...iters: Iterable<any>[]): Iterable<any> {
	yield* flat(iters);
}


/// makes an infinite iterable from given iterable
/// DO NOT SPREAD THIS! THIS IS INFINITE!
export function* cycle<T>(iter: Iterable<T>): Iterable<T> {
	while (true) {
		for (const item of iter) {
			yield item;
		}
	}
}

/// takes first n elements from an iter
export function* take<T>(iter: Iterable<T>, until: number): Iterable<T> {
	for (const [index, item] of entries(iter)) {
		if (index === until) return;

		yield item;
	}
}

/// mimics Array.prototype.slice
export function* takeWhile<T>(iter: Iterable<T>, boolFunc: hofFunc<T, boolean>): Iterable<T> {
	for (const [index, item] of entries(iter)) {
		if (!boolFunc(item, index)) return;

		yield item;
	}
}