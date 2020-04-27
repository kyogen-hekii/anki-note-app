import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openModal } from '../../reducers/modal'
import { saveToStore } from '../../utils/createVariantReducer'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import 'react-datasheet/lib/react-datasheet.css'
import Tabs from '../../components/Tabs'
import TextZone from '../../components/TextZone'

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
    currentTab: 'SELECTED NOTE',
  }
  deckTabs: any = ['SELECTED NOTE', 'ALL NOTE']
  // #endregion

 // #region render
  render() {
    const { category, note, isPrivate } = this.props.selectedData
    const { currentTab } = this.state

    if (_.isEmpty(category) || _.isEmpty(note)) {
      return (
        <div>
          Please select category and note at the <Link to="/home">HomePage</Link>
        </div>
      )
    }

    const ankiLink = isPrivate
      ? currentTab === 'SELECTED NOTE'
        ? `/anki/${category.id}/${note.id}/private`
        : `/anki/${category.id}/all/private`
      : currentTab === 'SELECTED NOTE'
      ? `/anki/${category.id}/${note.id}`
      : `/anki/${category.id}/all`
    return (
      <>
        <Tabs
          tabs={this.deckTabs}
          currentTab={currentTab}
          changeTab={(tab: string) => this.setState({ currentTab: tab })}
        />
        <div className="mb20" style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to={ankiLink}>
            <TextZone text="start" />
          </Link>
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
