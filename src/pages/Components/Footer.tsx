import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'
import FlashcardImg from '../../assets/svg/flashcard.svg'
import FlashcardImgOn from '../../assets/svg/flashcard-on.svg'
import HomeImg from '../../assets/svg/home.svg'
import HomeImgOn from '../../assets/svg/home-on.svg'
import NoteImg from '../../assets/svg/note.svg'
import NoteImgOn from '../../assets/svg/note-on.svg'
import styled from 'styled-components'

// #region constants
const pages = [
  {
    id: 'NOTE',
    to: '/note',
    clickable: (isExistsCategory: boolean) => isExistsCategory,
    logo: NoteImg,
    logoOn: NoteImgOn,
  },
  {
    id: 'HOME',
    to: '/home',
    clickable: (alwaysTrue: boolean) => true,
    logo: HomeImg,
    logoOn: HomeImgOn,
  },
  {
    id: 'ANKI',
    to: '/anki',
    clickable: (isExistsCategory: boolean) => isExistsCategory,
    logo: FlashcardImg,
    logoOn: FlashcardImgOn,
  },
]
// #endregion

type Props = {
  history: any
  isExistsCategory: boolean
}
const PageFooter = ({ history, isExistsCategory }: Props) => (
  <div style={{ position: 'fixed', left: 0, bottom: 0, backgroundColor: 'white', width: '100%' }}>
    <div className="pv20" style={{ display: 'flex', justifyContent: 'space-around' }}>
      {pages.map(p =>
        history.location.pathname === p.to ? (
          <div key={p.id} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <img key={p.id} src={p.logoOn} alt={p.id} width={50} height={50} />
            <span>{p.id}</span>
          </div>
        ) : (
          <StyledLink key={p.id} to={p.to} canClick={p.clickable(isExistsCategory)}>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <img src={p.logo} alt={p.id} width={50} height={50} />
              <span>{p.id}</span>
            </div>
          </StyledLink>
        ),
      )}
      {/* <button onClick={this.handleClickPopUser}>Callendar</button> */}
    </div>
  </div>
)
const mapStateToProps = (state: any) => ({
  selectedData: state.selectedData,
  isExistsCategory: !_.isEmpty(state.selectedData.note),
  currentPage: state.currentPage,
})
const mapDispatchToProps = {}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageFooter))

const StyledLink = styled(({ canClick, ...props }) => <Link {...props} />)`
  pointer-events: ${({ canClick }) => (canClick ? 'all' : 'none')};
`
