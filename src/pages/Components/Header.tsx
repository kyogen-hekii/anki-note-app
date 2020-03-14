//prepare
// rcc拡張
// state/cdm/handler/renderが入っている(connect版)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SiteLogo from '../../assets/svg/logo.svg'
// import SimpleFetch from "../../api/SimpleFetch"
// import { getUser } from "../../api/queries"

type Props = {
  selectedData: any
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
    const { category, note } = this.props.selectedData
    return (
      <div style={{ display: 'flex', backgroundColor: '#FEFEFE', alignItems: 'center' }}>
        <img src={SiteLogo} alt="logo" width={50} height={50} />
        <span className="mr5">{category?.label}</span>
        <span className="mr5">{note ? '>' : ''}</span>
        <span>{note?.title}</span>
      </div>
    )
  }
  // #endregion
}

const mapStateToProps = (state: any) => ({
  selectedData: state.selectedData,
})

const mapDispatchToProps = {
  //openModal,
}
export default connect(mapStateToProps, mapDispatchToProps)(InputEmailPage)
