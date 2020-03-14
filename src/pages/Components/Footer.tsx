//prepare
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
// import SimpleFetch from "../../api/SimpleFetch"
// import { getUser } from "../../api/queries"

type Props = {
  history: any
  currentPage: string
  //openModal: Function
}
class PageFooter extends Component<Props> {
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
    const pages = [
      {
        id: 'NOTE',
        to: '/note',
      },
      {
        id: 'HOME',
        to: '/home',
      },
      {
        id: 'ANKI',
        to: '/anki',
      },
    ]
    const { history } = this.props
    return (
      <div className="pv20" style={{ display: 'flex', justifyContent: 'space-around' }}>
        {pages.map(p =>
          history.location.pathname === p.to ? (
            <div key={p.id}>{p.id}</div>
          ) : (
            <Link key={p.id} to={p.to}>
              <div>{p.id}</div>
            </Link>
          ),
        )}
        {/* <button onClick={this.handleClickPopUser}>Callendar</button> */}
      </div>
    )
  }
  // #endregion
}

const mapStateToProps = (state: any) => ({
  currentPage: state.currentPage,
})

const mapDispatchToProps = {
  //openModal,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageFooter))
