import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { closeModal } from '../../../reducers/modal'
import { saveToStore } from '../../../utils/createVariantReducer'
import { setNote, getNotes } from '../../../api/queries'

type Props = {
  id: number
  auth: any
  selectedData: any
  callBack: any
  saveToStore: Function
  closeModal: Function
}
class SetModal extends Component<Props> {
  state: any = {
    noteName: '',
  }

  handleClick = async (e: any) => {
    e.preventDefault()
    const { noteName } = this.state
    const { auth } = this.state
    if (_.isEmpty(noteName)) {
      this.props.closeModal()
      return
    }
    const maxId = (await getNotes()).map(n => n.id).reduce((p, r) => Math.max(p, r))
    const newNote = {
      id: maxId + 1,
      categoryId: this.props.selectedData.category.id,
      title: noteName,
      author: '',
      content: auth?.displayName ? auth.diplayName : '',
      codepenUrl: '',
    }
    this.props.saveToStore('selectedData', 'note', newNote, setNote)

    const { callBack }: any = this.props
    console.log('callBack:', callBack)
    callBack && (await callBack())
    this.props.closeModal()
  }
  handlenoteNameChange = (e: any) => {
    const { value } = e.target
    this.setState({ noteName: value })
  }

  render() {
    const { codepenUrl } = this.state
    return (
      <div className={`align-center`}>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            value={codepenUrl}
            placeholder="please your note title"
            onChange={this.handlenoteNameChange}
            autoFocus
          />
          <button
            // onClick={() => {dispatch(closeModal())}} ※事前に dispatch = useDispatch()
            onClick={this.handleClick}
          >
            click me
          </button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.auth,
  selectedData: state.selectedData,
  callBack: ownProps.callBack,
})

const mapDispatchToProps = {
  saveToStore,
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetModal)