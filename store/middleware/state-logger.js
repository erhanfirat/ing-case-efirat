export const stateLogger = (store) => (next) => (action) => {
  console.log('[Middleware] Prev state: ', store.getState());
  console.log('[Middleware] Action: ', action);
  const result = next(action);
  console.log('[Middleware] Next state:', store.getState());
  return result;
};
