/**
 * Array intersect (curried) function. Finds
 * the intersection of two arrays.
 *
 * TODO :: GjB :: move to utility package?
 */
const intersection = (arr1) => (arr2) => (arr1 || []).filter((element) => (arr2 || []).includes(element));

const makeString = (arr, options = { separator: ', ', lastSeparator: 'and' }) => {
  if (arr === undefined) return '';
  if (arr === null) return '';
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  const last = arr.pop();
  return `${arr.join(options.separator)} ${options.lastSeparator} ${last}`;
};

// eslint-disable-next-line import/prefer-default-export
export { intersection, makeString };
