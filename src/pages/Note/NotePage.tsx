import React, { Component } from 'react'
import Markdown from 'react-markdown'
import SimpleFetch from '../../api/SimpleFetch'
import { getUser } from '../../api/queries'
import { connect } from 'react-redux'
import { openModal } from '../../reducers/modal'
import { saveToStore } from '../../utils/createVariantReducer'
import _ from 'lodash'
import ReactDataSheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css'
//@ts-ignore
import Codepen from 'react-codepen-embed'
import SetCodepenModal from './components/SetCodepenModal'

const CodepenEmbedded = (props: any) => {
  const h: string = props.hash || 'JyxeVP'
  return <Codepen hash={h} user="someone" />
}

type Props = {
  history: any
  selectedData: any
  openModal: Function
  saveToStore: Function
}
class NotePage extends Component<Props> {
  // constructor(props: any) {
  //   super(props)
  //   if (_.isEmpty(props.selectedData?.note)) {
  //     props.history.push('/home')
  //   }
  // }
  // #region state
  // TODO: local stateをglobal stateに昇格
  state: any = {
    user: {},
    currentTab: 'memo',
    isInputViewShown: true,
    grid: [
      [
        { value: 'A', readOnly: true },
        { value: 'B', readOnly: true },
      ],
      [{ value: 1 }, { value: 3 }],
      [{ value: 2 }, { value: 4 }],
    ],
  }
  // #endregion

  // #region componentDidMount
  async componentDidMount() {
    const user = await SimpleFetch(getUser(1))
    this.setState({ user })
    const { note } = this.props.selectedData
    if (_.isEmpty(note)) {
      this.props.saveToStore('selectedData', 'note', {
        ...note,
        title: 'new',
        content: 'please input',
      })
    }
    this.addVocabularyRows()
  }
  // #endregion

  // #region handler
  handleClickMemo = () => {
    this.setState({ currentTab: 'memo' })
  }
  handleClickVocabulary = () => {
    this.setState({ currentTab: 'vocabulary' })
  }
  handleClickCodepen = () => {
    this.setState({ currentTab: 'codepen' })
  }
  handleClickAdd = () => {
    const { currentTab } = this.state
    if (currentTab === 'vocabulary') {
      this.addVocabularyRows()
    } else {
      this.props.openModal(SetCodepenModal)
    }
  }
  handleClickCreateMemo = () => {
    const { note } = this.props.selectedData
    this.props.saveToStore('selectedData', 'note', { ...note, content: 'please input' })
  }
  handleChangeMemo = (e: any) => {
    const { note } = this.props.selectedData
    const content = e.target?.value
    this.props.saveToStore('selectedData', 'note', { ...note, content })
  }
  // #endregion
  // #region private method
  /**
   * vocabulary gridの行数を増やす
   * e.g.) 9→10, 14→20, 20→30
   */
  private addVocabularyRows = () => {
    const { grid } = this.state
    const plusRowNum = 10 - ((grid.length - 1) % 10)

    const g = grid.concat(
      [...Array(plusRowNum ? plusRowNum : 10)].map(() => {
        return [{ value: '' }, { value: '' }]
      }),
    )
    this.setState({ grid: g })
  }
  // #endregion

  // #region render
  render() {
    const { category, note } = this.props.selectedData
    const { currentTab, isInputViewShown } = this.state
    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            display: 'flex',
            flexFlow: 'column',
          }}
        >
          <button onClick={this.handleClickAdd}>+</button>
          <button>?</button>
        </div>

        <div>
          category: {category?.label}, note: {note?.title}
        </div>
        <div style={{ display: 'flex' }}>
          <button onClick={this.handleClickMemo}>memo</button>
          <button onClick={this.handleClickVocabulary}>vocabulary</button>
          <button onClick={this.handleClickCodepen}>codepen</button>
        </div>
        {currentTab === 'memo' && (
          <>
            {_.isEmpty(note?.content) ? (
              <button onClick={this.handleClickCreateMemo}>create</button>
            ) : (
              <>
                <div>
                  <button
                    onClick={() => {
                      this.setState({ isInputViewShown: !isInputViewShown })
                    }}
                    style={{ boxSizing: 'border-box' }}
                  >
                    switch
                  </button>
                </div>
                {isInputViewShown && (
                  <textarea
                    cols={30}
                    rows={10}
                    onChange={this.handleChangeMemo}
                    value={note?.content}
                  />
                )}
                {!isInputViewShown && <Markdown source={note.content} />}
              </>
            )}
          </>
        )}
        {currentTab === 'vocabulary' && (
          <ReactDataSheet
            data={this.state.grid}
            valueRenderer={(cell: any) => {
              cell.width = 200
              return cell.value
            }}
            onCellsChanged={changes => {
              const grid = this.state.grid.map((row: any) => [...row])
              changes.forEach(({ cell, row, col, value }) => {
                grid[row][col] = { ...grid[row][col], value }
              })
              this.setState({ grid })
            }}
          />
          //<ReactDataSheet data={this.state.grid2} valueRenderer={(cell: any) => cell.value} />
        )}
        {currentTab === 'codepen' && (
          <>
            {_.isEmpty(note?.codepenHash) ? (
              <button onClick={this.handleClickAdd}>create</button>
            ) : (
              <div>
                <CodepenEmbedded hash={note.codepenHash} />
              </div>
            )}
          </>
        )}
      </>
    )
  }
  // #endregion
}

const mapStateToProps = (state: any) => ({
  selectedData: state.selectedData,
})

const mapDispatchToProps = {
  saveToStore,
  openModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(NotePage)

// handleClickCategory = (selectedCategory: any) => {
//   this.props.saveToStore('category', 'category', selectedCategory)
// }
