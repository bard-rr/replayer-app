const rememberState = (stateObj) => {
  Object.entries(stateObj).forEach(([key, val]) => {
    sessionStorage.removeItem(key);
    sessionStorage.setItem(key, JSON.stringify(val));
  });
};

const getMemory = (key, defaultVal) => {
  const item = JSON.parse(sessionStorage.getItem(key)) || defaultVal;
  sessionStorage.removeItem(key);
  return item;
};

export { rememberState, getMemory };
