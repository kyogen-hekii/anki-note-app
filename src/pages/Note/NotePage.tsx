// state/cdm/handler/renderが入っている
import React, { Component } from 'react'
import SimpleFetch from '../../api/SimpleFetch'
import { getUser } from '../../api/queries'

export default class HomePage extends Component {
  // #region state
  // TODO: local stateをglobal stateに昇格
  state: any = {
    user: {},
    currentTab: 'memo',
  }
  // #endregion

  // #region componentDidMount
  async componentDidMount() {
    const user = await SimpleFetch(getUser(1))
    this.setState({ user })
  }
  // #endregion

  // #region handler
  handleClickPopUser = () => {
    // TODO
    const { user } = this.state
    window.alert(`my name is ${user.name}`)
  }
  handleClickMemo = () => {
    this.setState({ currentTab: 'memo' })
  }
  handleClick1on1 = () => {
    this.setState({ currentTab: '1:1' })
  }
  handleClickCodepen = () => {
    this.setState({ currentTab: 'codepen' })
  }
  handleClickAdd = () => {
    // TODO: popup modal
  }
  // #endregion

  // #region render
  render() {
    const { currentTab } = this.state
    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            display: 'flex',
            flexFlow: 'column',
          }}
        >
          <button>+</button>
          <button>?</button>
        </div>

        <div style={{ display: 'flex' }}>
          <button onClick={this.handleClickMemo}>memo</button>
          <button onClick={this.handleClick1on1}>1:1</button>
          <button onClick={this.handleClickCodepen}>codepen</button>
        </div>
        {currentTab === 'memo' && <div>memo</div>}
        {currentTab === '1:1' && <div>1:1</div>}
        {currentTab === 'codepen' && <div>codepen</div>}
        <div>
          <button onClick={this.handleClickPopUser}>私のユーザー名は?</button>
        </div>
      </>
    )
  }
  // #endregion
}
