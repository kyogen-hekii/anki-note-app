// #region import
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../reducers/modal'
// #endregion

// #region layout class
type Props = {
  modal: any
  closeModal: Function
}

class Modal extends Component<Props> {
  handleClose = () => {
    this.props.closeModal()
  }

  render() {
    const {
      isShow,
      Modal,
      props,
      callBack,
    }: {
      isShow: boolean
      Modal: React.FC<{ props?: any; callBack?: Function }>
      props: any
      callBack: Function
    } = this.props.modal

    if (!isShow) {
      return null
    }

    return (
      <div>
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'black',
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            className="p20"
            style={{
              width: '60%',
              height: 300,
              backgroundColor: 'white',
              borderRadius: 8,
            }}
          >
            <div className="m20">{Modal && <Modal props={props} callBack={callBack} />}</div>

            <div className="align-center">
              <button type="button" onClick={this.handleClose}>
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// #endregion

// #region container
const mapStateToProps = (state: any) => ({
  modal: state.modal,
})

const mapDispatchToProps = {
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
// #endregion
