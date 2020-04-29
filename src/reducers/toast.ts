// #region constant
const OPEN_TOAST = 'OPEN_TOAST'
const CLOSE_TOAST = 'CLOSE_TOAST'
// #endregion

// #region actions
export const openToast = (message: string) => {
  return { type: OPEN_TOAST, payload: { message } }
}
export const closeToast = () => {
  return { type: CLOSE_TOAST }
}
// #endregion

// #region reducer
const initialState: { isShow: boolean; message: string } = {
  isShow: false,
  message: '',
}
export default (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_TOAST:
      return {
        ...state,
        isShow: true,
        message: action.payload.message,
      }
    case CLOSE_TOAST:
      return { ...state, isShow: false, message: '' }
    default:
      return state
  }
}
// #endregion
