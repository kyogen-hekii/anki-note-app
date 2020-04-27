type State = { messages: string[] }
const initialState: State = {
  messages: [],
}
// #region constant
const ADD_ERROR = 'ADD_ERROR'
const REMOVE_ERROR = 'REMOVE_ERROR'
// #endregion

// #region actions
export const addError = (message: string) => {
  return { type: ADD_ERROR, payload: { message } }
}
export const removeError = () => {
  return { type: REMOVE_ERROR }
}
// #endregion

// #region reducer
export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        messages: state.messages.concat(action.payload.message),
      }
    case REMOVE_ERROR:
      const { messages } = state
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [first, ...others] = messages
      return { ...state, messages: others }
    default:
      return state
  }
}
// #endregion
