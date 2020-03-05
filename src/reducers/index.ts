import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
// import helloReducer from './hello.ts'
import { History } from 'history'

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    // hello: helloReducer,
  })

export default createRootReducer
