const CONST_LS_STATE_KEY = "my-state";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(CONST_LS_STATE_KEY);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(CONST_LS_STATE_KEY, serializedState);
  } catch (err) {
    // log toDo
    console.info("localStorage is not available. Please check the browser settings");
  }
};
