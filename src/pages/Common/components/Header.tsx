import React from 'react'
import { connect } from 'react-redux'
import SiteLogo from '../../../assets/svg/logo.svg'
import { openModal } from '../../../reducers/modal'
import SetLoginModal from '../containers/SetLoginModal'
import UserIcon from '../../../components/UserIcon'
import SetProfileModal from '../containers/SetProfileModal'
import _ from 'lodash'

type Props = {
  auth: any
  selectedData: any
  openModal: Function
}
const PageHeader = ({ auth, selectedData, openModal }: Props) => {
  const { category, note } = selectedData
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
          <span
            className="touchable"
            onClick={() => {
              if (_.isEmpty(auth)) {
                openModal(SetLoginModal)
              } else {
                openModal(SetProfileModal)
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
}
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader)
