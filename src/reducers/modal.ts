// #region constant
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
// #endregion

// #region actions
export const openModal = (Modal: any) => {
  return { type: OPEN_MODAL, payload: { Modal } }
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
      return { ...state, isShow: true, Modal: action.payload.Modal }
    case CLOSE_MODAL:
      return { ...state, isShow: false }
    default:
      return state
  }
}
// #endregion
