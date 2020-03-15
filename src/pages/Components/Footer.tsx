import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// #region constants
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
// #endregion

type Props = {
  history: any
}
const PageFooter = ({ history }: Props) => (
  <div style={{ position: 'fixed', left: 0, bottom: 0, backgroundColor: 'white', width: '100%' }}>
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
  </div>
)
const mapStateToProps = (state: any) => ({
  currentPage: state.currentPage,
})

const mapDispatchToProps = {}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageFooter))
