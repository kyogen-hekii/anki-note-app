import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import FlashcardImg from '../../assets/svg/flashcard.svg'
import FlashcardImgOn from '../../assets/svg/flashcard-on.svg'
import HomeImg from '../../assets/svg/home.svg'
import HomeImgOn from '../../assets/svg/home-on.svg'
import NoteImg from '../../assets/svg/note.svg'
import NoteImgOn from '../../assets/svg/note-on.svg'

// #region constants
const pages = [
  {
    id: 'NOTE',
    to: '/note',
    logo: NoteImg,
    logoOn: NoteImgOn,
  },
  {
    id: 'HOME',
    to: '/home',
    logo: HomeImg,
    logoOn: HomeImgOn,
  },
  {
    id: 'ANKI',
    to: '/anki',
    logo: FlashcardImg,
    logoOn: FlashcardImgOn,
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
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <img key={p.id} src={p.logoOn} alt={p.id} width={50} height={50} />
            <span>{p.id}</span>
          </div>
        ) : (
          <Link key={p.id} to={p.to}>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <img src={p.logo} alt={p.id} width={50} height={50} />
              <span>{p.id}</span>
            </div>
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
