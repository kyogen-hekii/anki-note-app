import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openModal } from '../../reducers/modal'
import { saveToStore } from '../../utils/createVariantReducer'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import 'react-datasheet/lib/react-datasheet.css'
import Tabs from '../../components/Tabs'

type Props = {
  history: any
  match: any
  page: any
  selectedData: any
  openModal: Function
  saveToStore: Function
}
class AnkiPage extends Component<Props> {
  // #region state
  // TODO: local stateをglobal stateに昇格
  state: any = {
    // whoseDeckTab
    // whichDeck
    currentTab: 'NoteDeck',
  }
  tabs: any = ['NoteDeck', 'CategoryDeck']
  // #endregion

  // #region componentDidMount
  componentDidMount() {}
  // #endregion

  // #region render
  render() {
    const { category, note } = this.props.selectedData
    const { categoryId, noteId } = this.props.match.params
    const { currentTab } = this.state

    if (_.isEmpty(category) || _.isEmpty(note)) {
      return (
        <div>
          Please select category and note at the <Link to="/home">HomePage</Link>
        </div>
      )
    }

    const ankiLink =
      currentTab === 'NoteDeck' ? `/anki/${category.id}/${note.id}` : `/anki/${category.id}/all`
    return (
      <>
        <Tabs
          tabs={this.tabs}
          currentTab={currentTab}
          changeTab={(tab: string) => this.setState({ currentTab: tab })}
        />
        <div style={{ display: 'flex' }}>
          <Link to={ankiLink}>start</Link>
        </div>
      </>
    )
  }
  // #endregion
}

const mapStateToProps = (state: any) => ({
  page: state.page,
  selectedData: state.selectedData,
})

const mapDispatchToProps = {
  saveToStore,
  openModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnkiPage)
