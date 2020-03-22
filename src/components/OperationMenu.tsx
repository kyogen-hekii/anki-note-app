import React from 'react'
import styled from 'styled-components'

const RelativeWrapper = styled.div`
  position: relative;
`
// const VerticalBar = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
//   display: flex;
//   flex-flow: column;
//`
//styled.div`
//styled(({})=>)
const VerticalBar = styled.div`
  position: absolute;
  padding: 1px;
  top: 0;
  right: 0;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  background-color: blue;
`
// const StyledLink = styled(({ canClick, ...props }) => <Link {...props} />)`
//   pointer-events: ${({ canClick }) => (canClick ? 'all' : 'none')};
// `

export default ({ obj }: any) => (
  <RelativeWrapper>
    <VerticalBar>
      <button onClick={obj.onPlusButtonClick} disabled={!obj.isAble.plus}>
        <i className="fa fa-plus" />
      </button>
      <button onClick={obj.onQuestionButtonClick} disabled={!obj.isAble.question}>
        ?
      </button>
      <button onClick={obj.onChangeButtonClick} disabled={!obj.isAble.change}>
        <i className="fa fa-exchange-alt" />
      </button>
      <button onClick={obj.onExportButtonClick} disabled={!obj.isAble.export}>
        <i className="fa fa-file-export" />
      </button>
    </VerticalBar>
  </RelativeWrapper>
)
