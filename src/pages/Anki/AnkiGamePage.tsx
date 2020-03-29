import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openModal } from '../../reducers/modal'
import { saveToStore } from '../../utils/createVariantReducer'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import 'react-datasheet/lib/react-datasheet.css'
import Tabs from '../../components/Tabs'
import { getNotesByCategoryId, getNote } from '../../api/queries'

type Props = {
  history: any
  match: any
  page: any
  selectedData: any
  openModal: Function
  saveToStore: Function
}
class AnkiGamePage extends Component<Props> {
  // #region state
  state: any = {
    isQuestionView: true,
    shuffledCard: [],
  }
  tabs: any = ['NoteDeck', 'CategoryDeck']
  // #endregion

  // #region componentDidMount
  async componentDidMount() {
    await this.initCard()
  }
  private async initCard() {
    const { categoryId, noteId } = this.props.match.params
    let selectedNotes: any
    if (noteId === 'all') {
      selectedNotes = await getNotesByCategoryId(categoryId)
    } else {
      selectedNotes = await getNote(noteId)
    }
    this.props.saveToStore('page', 'selectedNotes', selectedNotes)

    // [{left:'',right:''}...]形式にする
    const sortedCard = selectedNotes.reduce((previous: any, current: any) => {
      return current.vocabulary ? previous.concat(current.vocabulary) : previous
    }, [])
    // shuffleする
    const shuffledCard = _.shuffle(sortedCard)
    this.setState({ shuffledCard })
    this.props.saveToStore('page', 'shuffledCard', shuffledCard)
  }
  // #endregion

  handleClickAnswer = () => {
    const { isQuestionView } = this.state
    this.setState({ isQuestionView: !isQuestionView })
  }
  handleClickOk = () => {
    const { isQuestionView, shuffledCard } = this.state
    this.setState({
      isQuestionView: !isQuestionView,
      shuffledCard: shuffledCard.slice(1),
    })
  }
  handleClickNg = () => {
    const { isQuestionView, shuffledCard } = this.state
    this.setState({
      isQuestionView: !isQuestionView,
      shuffledCard: shuffledCard.slice(1).concat(shuffledCard[0]),
    })
  }
  // #region render
  render() {
    const { category, note } = this.props.selectedData
    const { categoryId, noteId } = this.props.match.params
    const { isQuestionView, shuffledCard } = this.state
    // console.log('match: ', this.props.match)
    if (!shuffledCard || _.isEmpty(shuffledCard)) {
      return <>finished</>
    }
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <div
          className="p20"
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderLeft: 'solid 6px #79BD9A',
            borderBottom: 'solid 2px #dadada',
            width: '80vw',
            height: '40vh',
          }}
        >
          <span>{isQuestionView ? shuffledCard[0].left : shuffledCard[0].right}</span>
        </div>
        {isQuestionView ? (
          <>
            <button type="button" style={{ margin: 20 }} onClick={this.handleClickAnswer}>
              answer
            </button>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', width: '100%' }}>
              <button
                type="button"
                style={{ margin: 20, width: '100vw' }}
                onClick={this.handleClickOk}
              >
                OK
              </button>
              <button
                type="button"
                style={{ margin: 20, width: '100vw' }}
                onClick={this.handleClickNg}
              >
                NG
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
}
// #endregion

const mapStateToProps = (state: any) => ({
  page: state.page,
  selectedData: state.selectedData,
})

const mapDispatchToProps = {
  saveToStore,
  openModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnkiGamePage)
