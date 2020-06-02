import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openModal } from '../../reducers/modal'
import { saveToStore } from '../../utils/createVariantReducer'
import _ from 'lodash'
import 'react-datasheet/lib/react-datasheet.css'
import { getNotesByCategoryId, getNote } from '../../api/queries'
import TextZone from '../../components/TextZone'
import CommonButton from '../../components/CommonButton'
import { base, secondary } from '../../utils/colors'

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
    isLoaded: false,
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
    await this.props.saveToStore('page', 'shuffledCard', shuffledCard)
    this.setState({ isLoaded: true })
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
    const { isQuestionView, shuffledCard, isLoaded } = this.state
    if (!isLoaded) {
      return null
    }
    if (!shuffledCard || _.isEmpty(shuffledCard)) {
      return (
        <div className="m20">
          <TextZone text="end" />
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <div
          className="p20"
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderLeft: `solid 6px ${secondary}`,
            borderBottom: 'solid 2px #dadada',
            width: 'calc(100vw - 40px - 4rem)',
            height: '40vh',
          }}
        >
          <span>{isQuestionView ? shuffledCard[0].left : shuffledCard[0].right}</span>
        </div>
        {isQuestionView ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CommonButton
              className="mb20"
              style={{ margin: 20, width: '70vw', backgroundColor: base }}
              onClick={this.handleClickAnswer}
              label="answer"
            />
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', width: '100%' }}>
              <CommonButton
                style={{ margin: 20, width: '100vw', backgroundColor: base }}
                onClick={this.handleClickOk}
                label="OK"
              />
              <CommonButton
                style={{ margin: 20, width: '100vw', backgroundColor: base }}
                onClick={this.handleClickNg}
                label="NG"
              />
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
