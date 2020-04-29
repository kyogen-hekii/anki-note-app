import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import _ from 'lodash'
import SiteLogo from '../../../assets/svg/logo.svg'
import { openModal } from '../../../reducers/modal'
import { openToast } from '../../../reducers/toast'
import { saveToStore } from '../../../utils/createVariantReducer'
import SetLoginModal from '../containers/SetLoginModal'
import SetProfileModal from '../containers/SetProfileModal'
import UserIcon from '../../../components/UserIcon'
import ToggleButton from '../../../components/ToggleButton'

type Props = {
  history: any
  auth: any
  selectedData: any
  openModal: Function
  openToast: Function
  saveToStore: Function
}

const PageHeader = ({ history, auth, selectedData, openModal, openToast, saveToStore }: Props) => {
  const { user } = auth
  const { category, note, isPrivate } = selectedData

  const goToHomePage = (clearNote: boolean) => {
    //memo: selectedDataは入れ子にしてあるから/homeでないとクリアされない?
    clearNote && saveToStore('selectedData', 'note', {})
    history.push('/home')
  }

  return (
    <>
      <div style={{ display: 'flex', backgroundColor: '#A8DBA8', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            className="mr5 touchable"
            onClick={() => goToHomePage(true)}
            src={SiteLogo}
            alt="logo"
            width={50}
            height={50}
          />
          <span style={{ fontSize: '1.7rem', color: 'white' }}>
            <span className="mr5 touchable" onClick={() => goToHomePage(true)}>
              {category?.label}
            </span>
            <span className="mr5">{note ? '>' : ''}</span>
            <span className="touchable" onClick={() => goToHomePage(false)}>
              {note?.title}
            </span>
            {!(_.isEmpty(note?.author) || note?.author === user?.displayName) && (
              <span>(read only)</span>
            )}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            className="mr5"
            to="/about"
            style={{ textDecoration: 'underline', fontSize: '1.3rem', fontWeight: 'bold' }}
          >
            AboutApp
          </Link>

          <ToggleButton
            isPrivate={isPrivate}
            onClick={() => {
              if (!user) {
                openToast('ログインして下さい')
                return
              }
              if (history.location.pathname !== '/home') {
                openToast('Homeで押して下さい')
                return
              }
              saveToStore('selectedData', 'note', {})
              saveToStore('selectedData', 'isPrivate', !isPrivate)
            }}
          />
          <span
            className="touchable"
            onClick={() => {
              if (_.isEmpty(auth)) {
                openModal(SetLoginModal, {}, () => {
                  history.push('/home')
                })
              } else {
                openModal(SetProfileModal, {}, () => {
                  history.push('/home')
                })
              }
            }}
          >
            <UserIcon isLogined={Boolean(auth.user?.uid)} />
            {/* <i className="fa fa-user" /> */}
          </span>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  selectedData: state.selectedData,
})
const mapDispatchToProps = {
  openModal,
  openToast,
  saveToStore,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageHeader))
