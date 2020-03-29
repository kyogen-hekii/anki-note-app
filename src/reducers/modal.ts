// #region constant
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
// #endregion

// #region actions
export const openModal = (Modal: any, props?: Object, callBack?: Function) => {
  return { type: OPEN_MODAL, payload: { Modal, props, callBack } }
}
export const closeModal = () => {
  return { type: CLOSE_MODAL }
}
// #endregion

// #region reducer
const initialState: { isShow: boolean; Modal: any } = {
  isShow: false,
  Modal: {},
}
export default (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isShow: true,
        Modal: action.payload.Modal,
        props: action.payload.props,
        callBack: action.payload.callBack,
      }
    case CLOSE_MODAL:
      return { ...state, isShow: false }
    default:
      return state
  }
}
// #endregion
