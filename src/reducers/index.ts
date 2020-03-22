import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import modal from './modal'
import createVariantReducer from '../utils/createVariantReducer'

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    page: createVariantReducer('page'),
    selectedData: createVariantReducer('selectedData'),
    modal,
  })

export default createRootReducer
