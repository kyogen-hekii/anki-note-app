import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../../../reducers/modal'
import CommonButton from '../../../components/CommonButton'

type Props = {
  callBack: any
  closeModal: Function
}

class SetModal extends Component<Props> {
  handleClick = () => {
    this.props.callBack()
    this.props.closeModal()
  }
  render() {
    return (
      <div className={`align-center`}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CommonButton className="mb10" onClick={this.handleClick} label="ファイル出力" />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: any, ownProps: any) => ({
  callBack: ownProps.callBack,
})

const mapDispatchToProps = {
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetModal)
