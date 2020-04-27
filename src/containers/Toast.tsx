import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeToast } from '../reducers/toast'

type Props = {
  toast: any
  closeToast: Function
}

class Toast extends Component<Props> {
  onClick = () => {
    this.props.closeToast()
  }

  render() {
    const { toast } = this.props

    if (!toast.isShow) {
      return null
    }

    setTimeout(() => {
      this.props.closeToast()
    }, 1500)

    return (
      <div
        style={{
          position: 'fixed',
          top: 20,
          left: 100,
          right: 100,
          height: 40,
          backgroundColor: '#343434',
          borderRadius: 8,
        }}
        onClick={this.onClick}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'white',
          }}
        >
          {toast.message}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  toast: state.toast,
})

const mapDispatchToProps = {
  closeToast,
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast)
