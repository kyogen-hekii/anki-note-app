import React from 'react'
import { connect } from 'react-redux'
import SiteLogo from '../../assets/svg/logo.svg'

type Props = {
  selectedData: any
}
const PageHeader = ({ selectedData }: Props) => {
  const { category, note } = selectedData
  return (
    <div style={{ display: 'flex', backgroundColor: '#FEFEFE', alignItems: 'center' }}>
      <img src={SiteLogo} alt="logo" width={50} height={50} />
      <span className="mr5">{category?.label}</span>
      <span className="mr5">{note ? '>' : ''}</span>
      <span>{note?.title}</span>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  selectedData: state.selectedData,
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader)
