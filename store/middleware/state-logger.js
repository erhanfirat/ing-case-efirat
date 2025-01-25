/**
 * It is regular logger for all redux actions and state changes
 * redux-logger is not used because of a bug on it
 */
export const stateLogger = (store) => (next) => (action) => {
  console.log('[Middleware] Prev state: ', store.getState());
  console.log('[Middleware] Action: ', action);
  const result = next(action);
  console.log('[Middleware] Next state:', store.getState());
  return result;
};
