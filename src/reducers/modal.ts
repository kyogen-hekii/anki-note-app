// #region import
import { handleActions } from 'redux-actions'
// #endregion

// #region reducer
const initialState: { isShow: boolean } = {
  isShow: false,
}
export default handleActions(
  {
    OPEN_MODAL: () => {
      return { isShow: true }
    },
    CLOSE_MODAL: () => {
      return { isShow: false }
    },
  },
  initialState,
)
// #endregion

// #region actions
export const openModal = () => {
  return { type: 'OPEN_MODAL' }
}
export const closeModal = () => {
  return { type: 'CLOSE_MODAL' }
}
// #endregion
