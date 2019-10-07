/**
 * Array intersect (curried) function. Finds
 * the intersection of two arrays.
 *
 * TODO :: GjB :: move to utility package?
 */
const intersection = (arr1) => (arr2) => (arr1 || []).filter((element) => (arr2 || []).includes(element));

// eslint-disable-next-line import/prefer-default-export
export { intersection };
