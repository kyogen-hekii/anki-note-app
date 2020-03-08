import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
// import helloReducer from './hello.ts'
import { History } from 'history'
import modal from './modal'

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    modal,
    // hello: helloReducer,
  })

export default createRootReducer
