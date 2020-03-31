import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import _ from 'lodash'

import SimpleFetch from '../../api/SimpleFetch'
import { getUser, getCategories, getNotes, deleteNote } from '../../api/queries'
import NoteItem from './components/NoteItem'
import { openModal } from '../../reducers/modal'
import { saveToStore } from '../../utils/createVariantReducer'
import { Link } from 'react-router-dom'
import SetCategoryModal from './containers/SetCategoryModal'
import OperationMenu from '../../components/OperationMenu'
import SetNoteModal from './containers/SetNoteModal'

type Props = {
  auth: any
  selectedData: {
    category: any
    note: any
  }
  page: any
  saveToStore: Function
  openModal: Function
}
class HomePage extends Component<Props> {
  // #region state
  state: any = {
    user: {},
  }
  operationMenuObj: any = {
    onPlusButtonClick: () => {
      const { category } = this.props.selectedData
      if (!category) {
        return
      }
      this.props.openModal(SetNoteModal, {}, this.initNotes)
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
    const user = await SimpleFetch(getUser(1))
    this.setState({ user })

    await this.initCategoryOptions()

    await this.initNotes()
  }
  // #endregion

  // #region handler
  handleClickCategory = (selectedCategory: any) => {
    if (selectedCategory.id === this.CREATE_ID) {
      this.props.openModal(SetCategoryModal, {}, this.initCategoryOptions)
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
      selectedData: { category },
      page: { categoryOptions, notes },
      auth: { user },
    } = this.props

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ flexGrow: 1 }}>
            <Select
              value={category}
              onChange={this.handleClickCategory}
              options={categoryOptions}
              className="mb10"
              styles={{
                control: styles => ({
                  ...styles,
                  border: 0,
                  backgroundColor: '#757575',
                  height: '4rem',
                }),
                singleValue: styles => ({ ...styles, color: '#EFEFEF' }),
              }}
            />
          </span>
        </div>
        <OperationMenu obj={this.operationMenuObj} />
        {!_.isEmpty(category) &&
          notes
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
            })}
      </div>
    )
  }
  // #endregion
}

// extends Component<Props>
const mapStateToProps = (state: any) => ({
  auth: state.auth,
  selectedData: state.selectedData,
  page: state.page,
})
const mapDispatchToProps = {
  saveToStore,
  openModal,
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
