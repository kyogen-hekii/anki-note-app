import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import SiteLogo from '../../../assets/svg/logo.svg'
import { openModal } from '../../../reducers/modal'
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
  saveToStore: Function
}
const PageHeader = ({ history, auth, selectedData, openModal, saveToStore }: Props) => {
  const { user } = auth
  const { category, note, isPrivate } = selectedData
  return (
    <>
      <div style={{ display: 'flex', backgroundColor: '#A8DBA8', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={SiteLogo} alt="logo" width={50} height={50} />
          <span style={{ fontSize: '1.7rem', color: 'white' }}>
            <span className="mr5">{category?.label}</span>
            <span className="mr5">{note ? '>' : ''}</span>
            <span>{note?.title}</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ToggleButton
            isPrivate={isPrivate}
            onClick={() => {
              history.location.pathname === '/home' &&
                user &&
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
  saveToStore,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageHeader))
