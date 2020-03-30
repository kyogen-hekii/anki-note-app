const initialState: any = {}
/**
 * targetを受け取り、action.targetをもつ、reducerを生成
 * e.g.) target: 'user'
 */
export default (target: string) => {
  // actionにtargetを生やして、targetName: {keyName1: valueName1...}とする
  return (state = initialState, action: any) => {
    if (target !== action.target) {
      return state
    }

    switch (action.type) {
      case 'SAVE_TO_STORE': {
        const { key, value } = action.payload
        return { ...state, [key]: value }
      }
      case 'CLEAR_STORE': {
        return {}
      }
    }
    return state
  }
}

// action creator
export const saveToStore = (target: string, key: string, value: any, setDataToDb?: Function) => {
  try {
    setDataToDb && setDataToDb(value)
  } catch (error) {
    console.error(error)
  }
  return { type: 'SAVE_TO_STORE', target, payload: { key, value } }
}
export const clearStore = (target: string) => {
  return { type: 'CLEAR_STORE', target }
}
