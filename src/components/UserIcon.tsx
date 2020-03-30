import React from 'react'
import styled from 'styled-components'

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  background-color: #c4c4c4;
`

export default ({ isLogined }: { isLogined?: boolean }) => {
  return <ProfileDiv>{isLogined ? <i className="fa fa-user fa-2x" /> : ''}</ProfileDiv>
}
