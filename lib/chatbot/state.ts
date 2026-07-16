const state = new Map<string, string>();

export function setState(userId: string, value: string) {
  state.set(userId, value);
}

export function getState(userId: string) {
  return state.get(userId);
}

export function clearState(userId: string) {
  state.delete(userId);
}