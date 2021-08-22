import { createStore } from 'solid-js/store';

export function request(endpoint: string, options?: RequestInit): Promise<any> {
  return fetch('http://localhost:3000/' + endpoint, options);
}

let store: any;
export function useStore() {
  if (!store) {
    store = createStore({
      activeHangout: 0,
    });
  }
  return store;
}
