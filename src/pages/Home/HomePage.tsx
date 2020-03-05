//prepare
//code ./src/pages/Home/HomePage.tsx
//code ./src/api/SimpleFetch.ts
//code ./src/api/queries.tsx
// rcc拡張
import React, { Component } from 'react'

import SimpleFetch from '../../api/SimpleFetch'
import { getUser } from '../../api/queries'

export default class HomePage extends Component {
  // #region state
  // TODO: local stateをglobal stateに昇格
  state: any = {
    user: {},
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
  // #endregion

  // #region render
  render() {
    return (
      <div>
        <button onClick={this.handleClickPopUser}>私のユーザー名は?</button>
      </div>
    )
  }
  // #endregion
}
