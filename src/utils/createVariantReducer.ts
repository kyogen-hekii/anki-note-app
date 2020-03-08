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
    }
    return state
  }
}

// action creator
export const saveToStore = (target: string, key: string, value: any) => {
  return { type: 'SAVE_TO_STORE', target, payload: { key, value } }
}
