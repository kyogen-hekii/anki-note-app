//prepare
// rcc拡張
// state/cdm/handler/renderが入っている(connect版)
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import SimpleFetch from "../../api/SimpleFetch"
// import { getUser } from "../../api/queries"

type Props = {
  //openModal: Function
}
class InputEmailPage extends Component<Props> {
  // #region state
  // TODO: local stateをglobal stateに昇格
  state: any = {
    user: {},
  }
  // #endregion

  // #region componentDidMount
  async componentDidMount() {
    // const user = await SimpleFetch(getUser(1))
    // this.setState({ user })
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
      <div style={{ display: 'flex' }}>
        <span>logo</span>
        <span>category</span>
        <span>></span>
        <span>note</span>
      </div>
    )
  }
  // #endregion
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {
  //openModal,
}
export default connect(mapStateToProps, mapDispatchToProps)(InputEmailPage)
