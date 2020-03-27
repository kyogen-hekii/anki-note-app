import styled from 'styled-components'

export const TransformScaleButton = styled.button`
  transition-duration: 0.3s;
  &:hover {
    transform: scale(1.2);
    transition-duration: 0.3s;
  }
`

export const TransformScaleDivButton = styled(TransformScaleButton.withComponent('div'))`
  cursor: pointer;
  user-select: none;
`
