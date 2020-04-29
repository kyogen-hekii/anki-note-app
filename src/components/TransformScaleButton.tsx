import styled, { css } from 'styled-components'

export const TransformScaleButton = styled.button<{ isInvalid?: boolean }>`
  ${({ isInvalid }) =>
    !isInvalid &&
    css`
      transition-duration: 0.3s;
      &:hover {
        transform: scale(1.2) translate(-5px);
        transition-duration: 0.3s;
      }
    `}
`

export const TransformScaleDivButton = styled(TransformScaleButton.withComponent('div'))`
  cursor: auto;
  ${({ isInvalid }) =>
    !isInvalid &&
    css`
      cursor: pointer;
      user-select: none;
    `}
`
