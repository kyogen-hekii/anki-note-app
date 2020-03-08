// state/cdm/handler/renderが入っている
import React, { Component } from 'react'
import SimpleFetch from '../../api/SimpleFetch'
import { getUser } from '../../api/queries'
import { connect } from 'react-redux'
import { openModal } from '../../reducers/modal'

type Props = {
  openModal: Function
}
class NotePage extends Component<Props> {
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
  handleClickVocabrary = () => {
    this.setState({ currentTab: 'vocabrary' })
  }
  handleClickCodepen = () => {
    this.setState({ currentTab: 'codepen' })
  }
  handleClickAdd = () => {
    // TODO: popup modal
    this.props.openModal()
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
          <button onClick={this.handleClickVocabrary}>vocabrary</button>
          <button onClick={this.handleClickCodepen}>codepen</button>
        </div>
        {currentTab === 'memo' && (
          <>
            <button>create</button>
            <div>content</div>
          </>
        )}
        {currentTab === 'vocabrary' && (
          <>
            <button>create</button>
            <div>vocabrary note</div>
          </>
        )}
        {currentTab === 'codepen' && (
          <>
            <button>create</button>
            <div>codepen</div>
          </>
        )}
        <div>
          <button onClick={this.handleClickAdd}>私のユーザー名は?</button>
        </div>
      </>
    )
  }
  // #endregion
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {
  openModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(NotePage)
