import React from 'react'
import styled from 'styled-components'

import { TransformScaleButton } from './TransformScaleButton'
import { light } from '../utils/colors'

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
  background-color: ${light};
  height: 3rem;
`

export default ({ obj }: any) => {
  if (!obj) return <></>
  return (
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
      </VerticalBar>
    </RelativeWrapper>
  )
}
