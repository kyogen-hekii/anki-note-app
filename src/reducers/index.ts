import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
// import helloReducer from './hello.ts'
import { History } from 'history'
import modal from './modal'
import createVariantReducer from '../utils/createVariantReducer'

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    selectedData: createVariantReducer('selectedData'),
    modal,
    // hello: helloReducer,
  })

export default createRootReducer
