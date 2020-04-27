import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'
import FlashcardImg from '../../../assets/svg/flashcard.svg'
import FlashcardImgOn from '../../../assets/svg/flashcard-on.svg'
import HomeImg from '../../../assets/svg/home.svg'
import HomeImgOn from '../../../assets/svg/home-on.svg'
import NoteImg from '../../../assets/svg/note.svg'
import NoteImgOn from '../../../assets/svg/note-on.svg'
import styled from 'styled-components'

// #region constants
const DEFAULT_SIZE = 30
const pages = [
  {
    id: 'NOTE',
    to: '/note',
    clickable: (isExistsCategory: boolean) => isExistsCategory,
    logo: NoteImg,
    logoOn: NoteImgOn,
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
  },
  {
    id: 'HOME',
    to: '/home',
    clickable: (alwaysTrue: boolean) => true,
    logo: HomeImg,
    logoOn: HomeImgOn,
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
  },
  {
    id: 'ANKI',
    to: '/anki',
    clickable: (isExistsCategory: boolean) => isExistsCategory,
    logo: FlashcardImg,
    logoOn: FlashcardImgOn,
    width: 50,
    height: DEFAULT_SIZE,
  },
]
// #endregion

type Props = {
  history: any
  isExistsCategory: boolean
}
const PageFooter = ({ history, isExistsCategory }: Props) => (
  <div
    style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      backgroundColor: 'white',
      width: '100vw',
      height: '8rem',
      display: 'flex',
      justifyContent: 'space-around',
    }}
  >
    {pages.map((p) =>
      (p.to === '/home' && history.location.pathname.match('/$')) ||
      history.location.pathname.match(p.to) ? (
        <div
          key={p.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#8CD790',
            width: '100vw', //すべて100%にしておけば、flexで等分できる
          }}
        >
          <span>
            <img
              key={p.id}
              src={p.logoOn}
              alt={p.id}
              width={p.width}
              height={p.height}
              style={{}}
            />
          </span>
          <span>{p.id}</span>
        </div>
      ) : (
        <div
          key={p.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            position: 'relative',
          }}
        >
          <StyledLink to={p.to} canClick={p.clickable(isExistsCategory)} />
          <span>
            <img src={p.logo} alt={p.id} width={p.width} height={p.height} />
          </span>
          <span>{p.id}</span>
        </div>
      ),
    )}
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
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`
