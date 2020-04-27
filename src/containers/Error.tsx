import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addError, removeError } from '../reducers/error'

const instance: { addError: Function } = {
  addError: () => {},
}
export const addErrorMessage = (message: string) => {
  instance.addError(message)
}

export default () => {
  const messages = useSelector((state: any) => state.error.messages)
  const dispatch = useDispatch()
  // 初期化しておく
  instance.addError = (message: string) => {
    dispatch(addError(message))
  }

  if (!messages.length) return null

  return (
    <div
      className="p20"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: 'pink' }}
    >
      <button
        onClick={() => {
          dispatch(removeError())
        }}
      >
        clear
      </button>
      {messages.map((message: string, i: number) => (
        <div key={i} style={{ color: 'red' }}>
          {message}
        </div>
      ))}
    </div>
  )
}
