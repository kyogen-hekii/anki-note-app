import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal, openModal } from '../../../reducers/modal'
import { saveToStore, clearStore } from '../../../utils/createVariantReducer'
import { login } from '../../../api/queries'
import SetSignupModal from './SetSignupModal'

type Props = {
  history: any
  auth: any
  saveToStore: Function
  clearStore: Function
  closeModal: Function
  openModal: Function
  callBack: Function
}
class SetModal extends Component<Props> {
  state: any = {
    email: '',
    password: '',
  }
  handleLoginClick = async (e: any) => {
    e.preventDefault()
    const { email, password } = this.state
    const user = await login(email, password)
    if (user) {
      this.props.saveToStore('auth', 'user', user)
      this.props.closeModal()
      const { callBack }: any = this.props
      callBack && callBack()
    }
  }
  handleSignupClick = async (e: any) => {
    e.preventDefault()
    this.props.clearStore('auth')
    this.props.closeModal()
    this.props.openModal(SetSignupModal)
  }
  handleEmailChange = (e: any) => {
    e.preventDefault()
    //const { email } = this.state
    this.setState({ email: e.target?.value })
  }
  handlePasswordChange = (e: any) => {
    e.preventDefault()
    //const { password } = this.state
    this.setState({ password: e.target?.value })
  }

  render() {
    const { email, password } = this.state
    return (
      <div className={`align-center`}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="mailAddress"
            value={email}
            placeholder="anki-app@anki.co.jp"
            onChange={this.handleEmailChange}
            autoFocus
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
          <button type="button" className="mb20" onClick={this.handleLoginClick}>
            ログイン
          </button>
          <span className="touchable" style={{ color: 'blue' }} onClick={this.handleSignupClick}>
            新規登録はこちら
          </span>
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
  clearStore,
  closeModal,
  openModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetModal)
