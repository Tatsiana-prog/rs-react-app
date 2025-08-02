declare module 'redux-mock-store' {
  import { Middleware, Action, AnyAction } from 'redux';

  export interface MockStore<S = unknown, A extends Action = AnyAction> {
    getState(): S;
    dispatch(action: A): A;
    subscribe(listener: () => void): () => void;
    clearActions(): void;
    getActions(): A[];
  }

  export function createStore<S = unknown, A extends Action = AnyAction>(
    middlewares?: Middleware[]
  ): (initialState?: S) => MockStore<S, A>;

  export default createStore;
}
