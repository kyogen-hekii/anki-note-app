import React from 'react'
import styled from 'styled-components'
import { TransformScaleButton } from './TransformScaleButton'

const RelativeWrapper = styled.div`
  position: relative;
`
const VerticalBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 4rem;
  display: flex;
  flex-flow: column;
`

const OperationButton = styled(TransformScaleButton)<{ isInvalid?: boolean }>`
  border-radius: 15px 0 0 15px;
  background-color: #fcaa00;
  height: 3rem;
`

export default ({ obj }: any) => (
  <RelativeWrapper>
    <VerticalBar>
      <OperationButton onClick={obj.onPlusButtonClick} disabled={!obj.isAble.plus}>
        <i className="fa fa-plus" />
      </OperationButton>
      <OperationButton onClick={obj.onChangeButtonClick} disabled={!obj.isAble.change}>
        <i className="fa fa-exchange-alt" />
      </OperationButton>
      <OperationButton onClick={obj.onExportButtonClick} disabled={!obj.isAble.export}>
        <i className="fa fa-file-export" />
      </OperationButton>
      <OperationButton
        onClick={obj.onDeleteButtonClick}
        disabled={!obj.isAble.delete}
        isInvalid={!obj.isAble.delete}
      >
        <i className="fa fa-trash" />
      </OperationButton>
    </VerticalBar>
  </RelativeWrapper>
)
