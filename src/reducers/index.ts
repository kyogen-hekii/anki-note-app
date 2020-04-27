import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import modal from './modal'
import toast from './toast'
import error from './error'
import createVariantReducer from '../utils/createVariantReducer'

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    page: createVariantReducer('page'),
    selectedData: createVariantReducer('selectedData', { isPrivate: false }),
    auth: createVariantReducer('auth'),
    modal,
    toast,
    error,
  })

export default createRootReducer
