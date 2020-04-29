import React from 'react'

type Props = {
  label: string
  onClick: (e?: any) => Promise<void> | void
  className?: string
  style?: any
}

export default ({ label, onClick, className = '', style = {} }: Props) => (
  <input
    type="button"
    value={label}
    onClick={onClick}
    className={`touchable ${className}`}
    style={{
      fontSize: '1.2rem',
      fontWeight: 'bold',
      padding: '8px 16px',
      border: `1px solid black`,
      borderRadius: 8,
      color: 'black',
      ...style,
    }}
  />
)
