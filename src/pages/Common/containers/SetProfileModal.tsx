import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { closeModal } from '../../../reducers/modal'
import { saveToStore, clearStore } from '../../../utils/createVariantReducer'
import { existsUserName, updateUserInfo, logout } from '../../../api/queries'

type Props = {
  auth: any
  saveToStore: Function
  clearStore: Function
  closeModal: Function
}
class SetModal extends Component<Props> {
  state: any = {
    userName: this.props.auth?.user?.displayName || '',
  }
  handleChangeClick = async (e: any) => {
    e.preventDefault()
    const { userName } = this.state
    const { user } = this.props.auth
    if (_.isEmpty(userName)) {
      this.props.closeModal()
      return
    }
    if (await existsUserName(userName)) {
      console.log('already exists')
      return
    }
    if (await updateUserInfo(user, userName)) {
      this.props.saveToStore('auth', 'user', { ...user, displayName: userName })
      this.props.closeModal()
    }
    return
  }
  handleLogoutClick = () => {
    logout()
    this.props.clearStore('auth')
    this.props.closeModal()
  }
  handleuserNameChange = (e: any) => {
    e.preventDefault()
    this.setState({ userName: e.target?.value })
  }

  render() {
    if (_.isEmpty(this.props.auth)) {
      this.props.closeModal()
    }
    const { userName } = this.state
    return (
      <div className={`align-center`}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="userName">ユーザ名(変更不可)</label>
          <input
            id="userName"
            type="text"
            value={userName}
            placeholder="handle name"
            onChange={this.handleuserNameChange}
            autoFocus
            readOnly
          />
          {/* <button type="button" className="mb20" onClick={this.handleChangeClick}>
            変更
          </button> */}
          <span className="touchable" style={{ color: 'blue' }} onClick={this.handleLogoutClick}>
            ログアウト
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SetModal)
