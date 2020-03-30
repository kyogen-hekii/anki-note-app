import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../../../reducers/modal'
import { saveToStore } from '../../../utils/createVariantReducer'
import { register } from '../../../api/queries'

type Props = {
  auth: any
  saveToStore: Function
  closeModal: Function
}
class SetModal extends Component<Props> {
  state: any = {
    userName: '',
    email: '',
    password: '',
  }
  handleClick = async (e: any) => {
    e.preventDefault()
    const { userName, email, password } = this.state

    const user = await register(userName, email, password)
    if (user) {
      this.props.saveToStore('auth', 'user', user)
      this.props.closeModal()
    }
  }
  handleUserNameChange = (e: any) => {
    this.setState({ userName: e.target?.value })
  }
  handleEmailChange = (e: any) => {
    this.setState({ email: e.target?.value })
  }
  handlePasswordChange = (e: any) => {
    this.setState({ password: e.target?.value })
  }

  render() {
    const { userName, email, password } = this.state
    return (
      <div className={`align-center`}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="userName">ユーザ名</label>
          <input
            id="userName"
            type="text"
            value={userName}
            placeholder="handle name"
            onChange={this.handleUserNameChange}
            autoFocus
            required
          />
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="mailAddress"
            value={email}
            placeholder="anki-app@anki.co.jp"
            onChange={this.handleEmailChange}
            required
          />
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="********"
            onChange={this.handlePasswordChange}
            required
          />
          <button onClick={this.handleClick}>新規登録</button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: any) => ({
  auth: state.auth,
})

const mapDispatchToProps = {
  saveToStore,
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetModal)
