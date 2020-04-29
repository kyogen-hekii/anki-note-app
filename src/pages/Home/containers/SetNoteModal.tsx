import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { closeModal } from '../../../reducers/modal'
import { saveToStore } from '../../../utils/createVariantReducer'
import { getNotes, createNote } from '../../../api/queries'
import CommonButton from '../../../components/CommonButton'

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
    const {
      auth: { user },
    } = this.props
    if (_.isEmpty(noteName)) {
      this.props.closeModal()
      return
    }
    const maxId = (await getNotes()).map((n) => n.id).reduce((p, r) => Math.max(p, r))
    const newNote = {
      id: maxId + 1,
      categoryId: this.props.selectedData.category.id,
      title: noteName,
      authorUid: user?.uid || '',
      author: user?.displayName || '',
      content: '',
      codepenUrl: '',
    }
    this.props.saveToStore('selectedData', 'note', newNote)
    await createNote(newNote)
    const { callBack }: any = this.props
    callBack && callBack()
    this.props.closeModal()
  }
  handlenoteNameChange = (e: any) => {
    e.preventDefault()
    const { value } = e.target
    this.setState({ noteName: value })
  }

  render() {
    const { noteName } = this.state
    return (
      <div className={`align-center`} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          className="mb10"
          type="text"
          value={noteName}
          placeholder="please your note title"
          onChange={this.handlenoteNameChange}
          autoFocus
        />
        <CommonButton className="mb10" onClick={this.handleClick} label="作成" />
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
