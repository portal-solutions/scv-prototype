const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// eslint-disable-next-line import/prefer-default-export
export { sleep };
