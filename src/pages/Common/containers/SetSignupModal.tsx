import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../../../reducers/modal'
import { openToast } from '../../../reducers/toast'
import { saveToStore } from '../../../utils/createVariantReducer'
import { register } from '../../../api/queries'
import CommonButton from '../../../components/CommonButton'

type Props = {
  auth: any
  saveToStore: Function
  closeModal: Function
  openToast: Function
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
      this.props.openToast('新規作成しました')
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
          <label htmlFor="userName" style={{ display: 'flex', justifyContent: 'left' }}>
            ユーザ名
          </label>
          <input
            className="mb10"
            id="userName"
            type="text"
            value={userName}
            placeholder="handle name"
            onChange={this.handleUserNameChange}
            autoFocus
            required
          />
          <label htmlFor="email" style={{ display: 'flex', justifyContent: 'left' }}>
            メールアドレス
          </label>
          <input
            className="mb10"
            id="email"
            type="mailAddress"
            value={email}
            placeholder="anki-app@anki.co.jp"
            onChange={this.handleEmailChange}
            required
          />
          <label htmlFor="password" style={{ display: 'flex', justifyContent: 'left' }}>
            パスワード
          </label>
          <input
            className="mb20"
            id="password"
            type="password"
            value={password}
            placeholder="********"
            onChange={this.handlePasswordChange}
            required
          />
          <CommonButton className="mb20" onClick={this.handleClick} label="新規登録" />
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
  openToast,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetModal)
