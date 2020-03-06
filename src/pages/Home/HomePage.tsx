import React, { Component } from 'react'

import SimpleFetch from '../../api/SimpleFetch'
import { getUser, getCategories, getNotes } from '../../api/queries'
import CategoryCard from './components/CategoryCard'
import NoteItem from './components/NoteItem'

export default class HomePage extends Component {
  // #region state
  // TODO: local stateをglobal stateに昇格
  state: any = {
    user: {},
    categories: [],
    selectedCategory: null,
    notes: [],
    selectedNotes: null,
  }
  // #endregion

  // #region componentDidMount
  async componentDidMount() {
    const user = await SimpleFetch(getUser(1))
    this.setState({ user })
    const categories = await SimpleFetch(getCategories())
    this.setState({ categories })
    const notes = await SimpleFetch(getNotes())
    this.setState({ notes })
  }
  // #endregion

  // #region handler
  handleClickPopUser = () => {
    // TODO
    const { user } = this.state
    window.alert(`my name is ${user.name}`)
  }
  handleClickCategory = (category: any) => {
    const selectedCategory = category
    this.setState({ selectedCategory })
  }
  handleClickNote = (note: any) => {
    const selectedNote = note
    this.setState({ selectedNote })
  }
  // #endregion

  // #region render
  render() {
    const { selectedCategory, categories, selectedNote, notes } = this.state
    return (
      <div>
        {!selectedCategory &&
          categories.map((c: any) => {
            return <CategoryCard key={c.id} category={c} onClick={this.handleClickCategory} />
          })}
        {selectedCategory &&
          notes
            .filter((n: any) => n.categoryId === selectedCategory.id)
            .map((n: any) => {
              return <NoteItem key={n.id} note={n} onClick={this.handleClickNote} />
            })}
        <button onClick={this.handleClickPopUser}>私のユーザー名は?</button>
      </div>
    )
  }
  // #endregion
}
