import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../../../reducers/modal'
import { saveToStore } from '../../../utils/createVariantReducer'

type Props = { selectedData: any; page: any; saveToStore: Function; closeModal: Function }
class SetModal extends Component<Props> {
  state: any = {
    codepenUrl: '',
  }
  handleClick = async (e: any) => {
    e.preventDefault()
    const { note } = this.props.selectedData
    const { codepenUrl } = this.state
    this.props.saveToStore('selectedData', 'note', { ...note, codepenUrl: codepenUrl })
    this.props.closeModal()
  }
  handleCodepenUrlChange = (e: any) => {
    const { value } = e.target
    this.setState({ codepenUrl: value })
  }

  render() {
    const { codepenUrl } = this.state
    return (
      <div className={`align-center`}>
        <div>please input codepen's URL.</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            value={codepenUrl}
            placeholder="e.g.) https://codepen.io/kyogen0/pen/BaavNYr"
            onChange={this.handleCodepenUrlChange}
          />
          <button
            // onClick={() => {dispatch(closeModal())}} ※事前に dispatch = useDispatch()
            onClick={this.handleClick}
          >
            click me
          </button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: any) => ({
  selectedData: state.selectedData,
  // page: state.page,
})

const mapDispatchToProps = {
  saveToStore,
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetModal)
