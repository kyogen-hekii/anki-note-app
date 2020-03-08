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

type Props = {
  selectedData: any
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
  // #endregion

  // #region componentDidMount
  async componentDidMount() {
    const user = await SimpleFetch(getUser(1))
    this.setState({ user })
    const categoryOptions = await SimpleFetch(getCategories())
    this.setState({ categoryOptions })
    const notes = await SimpleFetch(getNotes())
    this.setState({ notes })
  }
  // #endregion

  // #region handler
  handleClickCategory = (selectedCategory: any) => {
    this.props.saveToStore('selectedData', 'category', selectedCategory)
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
        <Select value={category} onChange={this.handleClickCategory} options={categoryOptions} />
        {!_.isEmpty(category) &&
          notes
            .filter((n: any) => n.categoryId === category.id)
            .map((n: any) => {
              return (
                <Link to="/note">
                  <NoteItem key={n.id} note={n} onClick={this.handleClickNote} />
                </Link>
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
