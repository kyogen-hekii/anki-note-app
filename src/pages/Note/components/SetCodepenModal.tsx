import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../../../reducers/modal'

type Props = { closeModal: Function }
class SetModal extends Component<Props> {
  handleClick = () => {
    window.alert('clicked')
    this.props.closeModal()
  }

  render() {
    return (
      <div className="align-center">
        <div>modal</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            // onClick={() => {dispatch(closeModal())}} ※事前に dispatch = useDispatch()
            onClick={this.handleClick}
          >
            click me
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetModal)
