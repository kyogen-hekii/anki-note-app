import React from 'react'

export default ({ category, onClick }: any) => {
  return (
    <div
      onClick={() => {
        onClick(category)
      }}
    >
      {category.name}
    </div>
  )
}
