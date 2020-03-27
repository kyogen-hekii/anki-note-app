import React from 'react'
import styled, { css } from 'styled-components'

export const TransformScaleButton = styled.button<{ isInvalid?: boolean }>`
  ${({ isInvalid }) =>
    !isInvalid &&
    css`
      transition-duration: 0.3s;
      &:hover {
        transform: scale(1.2);
        transition-duration: 0.3s;
      }
    `}
`

export const TransformScaleDivButton = styled(TransformScaleButton.withComponent('div'))`
  cursor: pointer;
  user-select: none;
`
