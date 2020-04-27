import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openModal } from '../../reducers/modal'
import { saveToStore } from '../../utils/createVariantReducer'
import moment from 'moment'
import _ from 'lodash'
import 'react-datasheet/lib/react-datasheet.css'
import { getNotesByCategoryId, getNote, updateNoteVocabulary } from '../../api/queries'

type Props = {
  history: any
  match: any
  page: any
  selectedData: any
  openModal: Function
  saveToStore: Function
}
class AnkiPrivateGamePage extends Component<Props> {
  // #region state
  state: any = {
    isQuestionView: true,
    shuffledCard: [],
  }
  tabs = ['NoteDeck', 'CategoryDeck']
  intervals: number[] = [1, 2, 3, 8, 17]
  progressChange = {
    good: 1,
    soso: -1,
    bad: -3,
  }
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

    // [{left:'',right:''}...]形式にする
    const sortedCard = selectedNotes.reduce((previous: any, current: any) => {
      return current.vocabulary
        ? previous.concat(
            current.vocabulary.filter((e: any) => e.dueDate?.toDate() <= moment().toDate()),
          )
        : previous
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
  createUpdateCard = (p: 'good' | 'soso' | 'bad') => {
    const { shuffledCard } = this.state
    const v = shuffledCard[0]
    const t0 = v.dueDate.toDate()
    const interval =
      p !== 'good'
        ? 0
        : this.intervals.length <= v?.progress
        ? this.intervals.slice(-1)[0]
        : this.intervals[v.progress] || 1
    const newDueDate = moment(t0).add(interval, 'd')
    const progress =
      p !== 'good' ? this.progressChange[p] : v.progress ? v.progress + this.progressChange[p] : 1
    const updatedCard = {
      ...v,
      dueDate: newDueDate.toDate(),
      progress: progress < 0 ? 0 : progress,
    }
    return updatedCard
  }
  handleClickScore100 = () => {
    const { note } = this.props.selectedData
    const { isQuestionView, shuffledCard } = this.state

    const updatedCard = this.createUpdateCard('good')

    updateNoteVocabulary(note, updatedCard, updatedCard.index)
    this.setState({
      isQuestionView: !isQuestionView,
      shuffledCard: shuffledCard.slice(1),
    })
  }
  handleClickScore50 = () => {
    const { note } = this.props.selectedData
    const { isQuestionView, shuffledCard } = this.state

    const updatedCard = this.createUpdateCard('soso')

    updateNoteVocabulary(note, updatedCard, updatedCard.index)
    this.setState({
      isQuestionView: !isQuestionView,
      shuffledCard: shuffledCard.slice(1).concat(shuffledCard[0]),
    })
  }
  handleClickScore0 = () => {
    const { note } = this.props.selectedData
    const { isQuestionView, shuffledCard } = this.state

    const updatedCard = this.createUpdateCard('bad')

    updateNoteVocabulary(note, updatedCard, updatedCard.index)

    this.setState({
      isQuestionView: !isQuestionView,
      shuffledCard: shuffledCard.slice(1).concat(shuffledCard[0]),
    })
  }
  // #region render
  render() {
    const { isQuestionView, shuffledCard } = this.state
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
                onClick={this.handleClickScore100}
              >
                〇
              </button>
              <button
                type="button"
                style={{ margin: 20, width: '100vw' }}
                onClick={this.handleClickScore50}
              >
                △
              </button>
              <button
                type="button"
                style={{ margin: 20, width: '100vw' }}
                onClick={this.handleClickScore0}
              >
                ×
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

export default connect(mapStateToProps, mapDispatchToProps)(AnkiPrivateGamePage)
