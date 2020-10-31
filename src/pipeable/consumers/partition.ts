import type { hofFunc } from '../..';

/// splits iterable into 2 chunks based on result of the boolean function
function partition<T>(partFunc: hofFunc<T, boolean>) {
  return (iter: Iterable<T>): [Iterable<T>, Iterable<T>] => {
    const arr1 = [];
    const arr2 = [];
  
    for (const item of iter) {
      if (partFunc(item)) {
        arr1.push(item);
      } else {
        arr2.push(item);
      }
    }
  
    return [arr1, arr2];
  }
}

export default partition;