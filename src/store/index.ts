// #region import
import { createBrowserHistory, History } from 'history'
import { applyMiddleware, createStore, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../reducers'
// #endregion

// #region createBrowserHistory
export const history: History = createBrowserHistory()
// #endregion

// #region composeEnhancers
interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}
declare var window: ExtendedWindow
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// #endregion

export default function configureStore<T>(preloadedState?: T) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState, // initialState
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  )
  return store
}
