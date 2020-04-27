import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import _ from 'lodash'

import SimpleFetch from '../../api/SimpleFetch'
import { getCategories, getNotes, deleteNote } from '../../api/queries'
import NoteItem from './components/NoteItem'
import { openModal } from '../../reducers/modal'
import { openToast } from '../../reducers/toast'
import { saveToStore } from '../../utils/createVariantReducer'
import { Link } from 'react-router-dom'
import SetCategoryModal from './containers/SetCategoryModal'
import OperationMenu from '../../components/OperationMenu'
import SetNoteModal from './containers/SetNoteModal'
import TextZone from '../../components/TextZone'

type Props = {
  auth: any
  selectedData: {
    category: any
    note: any
    isPrivate: boolean
  }
  page: any
  saveToStore: Function
  openModal: Function
  openToast: Function
}
class HomePage extends Component<Props> {
  // #region state
  operationMenuObj: any = {
    onPlusButtonClick: () => {
      const { category } = this.props.selectedData
      if (!category) {
        this.props.openToast('カテゴリーを選択してください')
        return
      }
      this.props.openModal(SetNoteModal, { height: 100 }, this.initNotes)
    },
    isAble: {
      plus: true,
      export: false,
      change: false,
    },
  }
  // #endregion
  CREATE_ID: number = 999
  // #region componentDidMount
  async componentDidMount() {
    await this.initCategoryOptions()
    await this.initNotes()
  }
  // #endregion

  // #region handler
  handleClickCategory = (selectedCategory: any) => {
    if (selectedCategory.id === this.CREATE_ID) {
      this.props.openModal(SetCategoryModal, { height: 100 }, this.initCategoryOptions)
      return
    }
    this.props.saveToStore('selectedData', 'category', selectedCategory)
    this.props.saveToStore('selectedData', 'note', {})
  }
  handleClickNote = (selectedNote: any) => {
    this.props.saveToStore('selectedData', 'note', selectedNote)
  }
  handleClickDelete = async (selectedNote: any) => {
    const { category } = this.props.selectedData
    await deleteNote(selectedNote, category.label)
    await this.initNotes()
  }
  // #endregion

  // #region private method
  private initCategoryOptions = async () => {
    const categoryOptions = await SimpleFetch(getCategories())
    const appendixOption = {
      id: this.CREATE_ID,
      value: 'add_category',
      label: 'add category...',
    }
    this.props.saveToStore('page', 'categoryOptions', categoryOptions.concat(appendixOption))
  }
  private initNotes = async () => {
    const notes = await SimpleFetch(getNotes())
    this.props.saveToStore('page', 'notes', notes)
  }
  // #endregion

  // #region render
  render() {
    const {
      selectedData: { category, isPrivate },
      page: { categoryOptions, notes },
      auth: { user },
    } = this.props

    return (
      <div style={{ marginBottom: '8rem' }}>
        <Select
          value={category}
          onChange={this.handleClickCategory}
          options={categoryOptions}
          className="mb10"
          styles={{
            control: (styles) => ({
              ...styles,
              border: 0,
              backgroundColor: '#757575',
              height: '4rem',
            }),
            singleValue: (styles) => ({ ...styles, color: '#EFEFEF' }),
          }}
        />
        <OperationMenu obj={this.operationMenuObj} />
        {!_.isEmpty(category) && !_.isEmpty(notes) ? (
          notes
            .filter((n: any) => !isPrivate || n.author === user?.displayName)
            .filter((n: any) => n.categoryId === category.id)
            .map((n: any) => {
              return (
                <div key={n.id} style={{ marginRight: '4rem' }}>
                  <Link to="/note">
                    <NoteItem
                      note={n}
                      onClick={this.handleClickNote}
                      onDeleteClick={this.handleClickDelete}
                      disableDelete={!_.isEmpty(n?.author) && n?.author !== user?.displayName}
                    />
                  </Link>
                </div>
              )
            })
        ) : (
          <TextZone text="カテゴリーを選んでください" />
        )}
      </div>
    )
  }
  // #endregion
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  selectedData: state.selectedData,
  page: state.page,
})
const mapDispatchToProps = {
  saveToStore,
  openModal,
  openToast,
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
