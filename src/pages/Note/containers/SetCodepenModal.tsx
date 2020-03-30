import React, { Component } from 'react'
import { connect } from 'react-redux'
//@ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { closeModal } from '../../../reducers/modal'
import { saveToStore } from '../../../utils/createVariantReducer'
import { setNote } from '../../../api/queries'

type Props = {
  selectedData: any
  page: any
  isChange: boolean
  isExport: boolean
  saveToStore: Function
  closeModal: Function
}
class SetModal extends Component<Props> {
  state: any = {
    codepenUrl: '',
  }
  componentDidMount() {
    const { note } = this.props.selectedData
    if (!note) {
      return
    }
    const { isChange, isExport } = this.props
    if (isChange || isExport) {
      this.setState({ codepenUrl: note.codepenUrl })
    }
  }

  handleClick = async (e: any) => {
    e.preventDefault()
    const { note } = this.props.selectedData
    const { codepenUrl } = this.state
    this.props.saveToStore('selectedData', 'note', { ...note, codepenUrl: codepenUrl }, setNote)
    this.props.closeModal()
  }
  handleCodepenUrlChange = (e: any) => {
    const { value } = e.target
    this.setState({ codepenUrl: value })
  }
  render() {
    const { codepenUrl } = this.state
    const { isExport } = this.props
    return (
      <div className={`align-center`}>
        {isExport ? (
          <>
            <a className="mr5" href={codepenUrl} target="_blank" rel="noreferrer noopener">
              codepen Link
            </a>
            <CopyToClipboard text={codepenUrl} onCopy={() => console.log('copied!')}>
              <button type="button">
                <i className="fa fa-copy" />
              </button>
            </CopyToClipboard>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>please input codepen's URL.</div>
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
              set codepen
            </button>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state: any, ownProps: any) => ({
  selectedData: state.selectedData,
  isChange: ownProps.props?.isChange,
  isExport: ownProps.props?.isExport,
})

const mapDispatchToProps = {
  saveToStore,
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetModal)
