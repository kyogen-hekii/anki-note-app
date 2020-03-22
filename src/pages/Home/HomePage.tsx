import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import _ from 'lodash'

import SimpleFetch from '../../api/SimpleFetch'
import { getUser, getCategories, getNotes } from '../../api/queries'
import NoteItem from './components/NoteItem'
import { openModal } from '../../reducers/modal'
import { saveToStore } from '../../utils/createVariantReducer'
import { Link } from 'react-router-dom'
import SetCategoryModal from './components/SetCategoryModal'
import OperationMenu from '../../components/OperationMenu'
import SetNoteModal from './components/SetNoteModal'

type Props = {
  selectedData: {
    category: any
    note: any
  }
  saveToStore: Function
  openModal: Function
}
class HomePage extends Component<Props> {
  // #region state
  state: any = {
    user: {},
    categoryOptions: [],
    notes: [],
  }
  obj: any = {
    onPlusButtonClick: () => {
      this.props.openModal(SetNoteModal)
    },
    onQuestionButtonClick: () => {
      console.log('question_memo')
    },
    onExportButtonClick: () => {
      console.log('')
    },
    onChangeButtonClick: () => {
      console.log('')
    },
    isAble: {
      plus: true,
      question: true,
      export: true,
      change: true,
    },
  }
  // #endregion
  CREATE_ID: number = 999
  // #region componentDidMount
  async componentDidMount() {
    const user = await SimpleFetch(getUser(1))
    this.setState({ user })
    const categoryOptions = await SimpleFetch(getCategories())
    this.setState({
      categoryOptions: categoryOptions.concat({
        id: this.CREATE_ID,
        value: 'add_category',
        label: 'add category...',
      }),
    })
    const notes = await SimpleFetch(getNotes())
    this.setState({ notes })
  }
  // #endregion

  // #region handler
  handleClickCategory = (selectedCategory: any) => {
    if (selectedCategory.id === this.CREATE_ID) {
      this.props.openModal(SetCategoryModal)
      return
    }
    this.props.saveToStore('selectedData', 'category', selectedCategory)
    this.props.saveToStore('selectedData', 'note', {})
  }
  handleClickNote = (selectedNote: any) => {
    this.props.saveToStore('selectedData', 'note', selectedNote)
  }
  handleSetData = () => {
    this.props.openModal()
  }
  // #endregion

  // #region render
  render() {
    const { category } = this.props.selectedData
    const { categoryOptions, notes } = this.state
    return (
      <div>
        <Select
          value={category}
          onChange={this.handleClickCategory}
          options={categoryOptions}
          className="mb10"
        />

        <OperationMenu obj={this.obj} />
        {!_.isEmpty(category) &&
          notes
            .filter((n: any) => n.categoryId === category.id)
            .map((n: any) => {
              return (
                <div key={n.id}>
                  <Link to="/note">
                    <NoteItem note={n} onClick={this.handleClickNote} />
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
  selectedData: state.selectedData,
})
const mapDispatchToProps = {
  saveToStore,
  openModal,
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
