import React, { Component } from 'react'
import Markdown from 'react-markdown'
import SimpleFetch from '../../api/SimpleFetch'
import { getUser, setNote } from '../../api/queries'
import { connect } from 'react-redux'
import { openModal } from '../../reducers/modal'
import { saveToStore } from '../../utils/createVariantReducer'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import ReactDataSheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css'
import SetCodepenModal from './containers/SetCodepenModal'
import OperationMenu from '../../components/OperationMenu'
import Tabs from '../../components/Tabs'
import EmbeddedCodepen from './components/EmbeddedCodepen'

type Props = {
  history: any
  page: any
  selectedData: any
  openModal: Function
  saveToStore: Function
}
class NotePage extends Component<Props> {
  // #region state
  // TODO: local stateをglobal stateに昇格
  state: any = {
    user: {},
    currentTab: 'memo',
    isInputViewShown: true,
    isChanged: false,
    hideMode: false,
  }
  allClickable: any = {
    plus: true,
    export: true,
    change: true,
  }
  operationMenuObj: any = {
    memo: {
      onPlusButtonClick: () => {
        this.memoPlusButtonClick()
      },
      onExportButtonClick: () => {
        this.memoExportButtonClick()
      },
      onChangeButtonClick: () => {
        this.memoChangeButtonClick()
      },
      isAble: this.allClickable,
    },
    vocabulary: {
      onPlusButtonClick: () => {
        this.vocabularyPlusButtonClick()
      },
      onExportButtonClick: () => {
        this.vocabularyExportButtonClick()
      },
      onChangeButtonClick: () => {
        this.vocabularyChangeButtonClick()
      },
      isAble: this.allClickable,
    },
    codepen: {
      onPlusButtonClick: () => {
        this.codepenPlusButtonClick()
      },
      onExportButtonClick: () => {
        this.codepenExportButtonClick()
      },
      onChangeButtonClick: () => {
        this.codepenChangeButtonClick()
      },
      isAble: this.allClickable,
    },
  }
  // #endregion

  // #region componentDidMount
  componentDidMount() {
    // const user = await SimpleFetch(getUser(1))
    // this.setState({ user })
    this.setState({ currentTab: Object.keys(this.operationMenuObj)[0] })

    const { note } = this.props.selectedData
    if (note && note.vocabulary) {
      // vocabulary
      this.addVocabularyRows({ isFirst: true })
    }
  }
  componentWillUnmount() {
    this.deleteEmptyRows()
  }
  // #endregion

  // #region handler
  handleChangeMemo = async (e: any) => {
    const { note } = this.props.selectedData
    const content = e.target?.value
    this.props.saveToStore('selectedData', 'note', { ...note, content }, setNote)
  }
  handleChangeVocabulary = (changes: ReactDataSheet.CellsChangedArgs<any, string>) => {
    const { note } = this.props.selectedData
    const { vocabulary }: { vocabulary: any[] } = note
    const serializedVocabulary = this.serializeVocabulary(vocabulary)
    changes.forEach(({ cell, row, col, value }) => {
      serializedVocabulary[row][col] = { ...serializedVocabulary[row][col], value }
    })
    // const parsedVocabulary = this.parseVocabulary(serializedVocabulary)
    // console.log('will saved: ', parsedVocabulary)
    this.props.saveToStore(
      'selectedData',
      'note',
      { ...note, vocabulary: this.parseVocabulary(serializedVocabulary) },
      setNote,
    )
  }
  // #endregion

  // #region private method

  // #region memo
  memoPlusButtonClick = () => {
    const { note } = this.props.selectedData
    if (!_.isEmpty(note?.content)) {
      console.log('already exists')
      return
    }
    this.props.saveToStore('selectedData', 'note', {
      ...note,
      content: 'please input markdown memo',
    })
  }
  private memoExportButtonClick = () => {
    const { note } = this.props.selectedData
    if (!note) {
      return
    }
    const fileName = `${note.title}.md`
    const exportData = note.content
    this.exportFile(fileName, exportData)
  }
  private memoChangeButtonClick = () => {
    const { isInputViewShown } = this.state
    this.setState({ isInputViewShown: !isInputViewShown })
  }
  // #endregion

  // #region vocabulary
  vocabularyPlusButtonClick = async () => {
    const { note } = this.props.selectedData
    const { vocabulary } = note
    if (!vocabulary) {
      await this.props.saveToStore('selectedData', 'note', { ...note, vocabulary: [] })
    }
    this.addVocabularyRows({ isFirst: false })
  }
  vocabularyExportButtonClick = async () => {
    await this.deleteEmptyRows()
    const { note } = this.props.selectedData
    const { vocabulary } = note

    if (!vocabulary) {
      console.log('data is nothing')
      return
    }

    const resultJson = JSON.stringify(
      vocabulary.reduce((accumulator: any, currentValue: any, index: number) => {
        return Object.assign(accumulator, { [index + 1]: currentValue })
      }, {}),
      undefined,
      2,
    )
    const fileName = `${note.title}.json`
    this.exportFile(fileName, resultJson)
  }
  vocabularyChangeButtonClick = () => {
    const { hideMode } = this.state
    this.setState({ hideMode: !hideMode })
  }
  // #endregion

  // #region vocabulary rows
  private deleteEmptyRows = async () => {
    const { note } = this.props.selectedData
    if (!note) {
      return
    }
    const { vocabulary } = note
    if (!vocabulary) {
      return
    }

    if (vocabulary[-1]?.left || vocabulary[-1]?.right) {
      return
    }

    let isFinished = false
    const vocabularyRows = vocabulary
      .slice()
      .reverse()
      .map((v: any) => {
        if (isFinished || v.left || v.right) {
          isFinished = true
          return v
        }
        return null
      })
      .filter((v: any) => v)
      .reverse()

    this.props.saveToStore(
      'selectedData',
      'note',
      {
        ...note,
        vocabulary: vocabularyRows,
      },
      setNote,
    )
  }
  /**
   * vocabulary gridの行数を増やす
   * e.g.) 9→10, 14→20, 20→30(isFirst=falseの場合のみ,true時は20のまま)
   */
  private addVocabularyRows = ({ isFirst = false }: { isFirst?: boolean }) => {
    const { note } = this.props.selectedData
    if (!note) {
      return
    }

    const { vocabulary } = note
    let vocabularyRows = vocabulary as any[]

    const plusRowNum = (10 - (vocabularyRows.length % 10)) % 10
    vocabularyRows = vocabularyRows.concat(
      [...Array(plusRowNum ? plusRowNum : isFirst ? 0 : 10)].map(() => {
        return { left: '', right: '' }
      }),
    )
    // memo: ここで保存しなくても、よそで保存処理走る可能性あるけど良しとする。
    this.props.saveToStore('selectedData', 'note', {
      ...note,
      vocabulary: vocabularyRows,
    })
  }

  private codepenUrlToHash = (codepenUrl: string) => {
    return codepenUrl.split('/').slice(-1)[0]
  }
  /**
   * DB保存時用のparse
   */
  private parseVocabulary = (vocabulary: any[]) => {
    const arr = vocabulary
      .filter((e, i) => i > 0)
      .map((e: any[]) =>
        // memo:[ [{value: leftvalue},{value: rightvalue}],...]このようなペアの状態で表示している(他propsは略)
        e.reduce((left: any, right: any) => {
          return { left: left.value, right: right.value }
        }),
      )
    return arr
  }
  /**
   * DBから取得した、storeのデータを表示用にserialize
   */
  private serializeVocabulary = (vocabulary: any[]) => {
    if (!vocabulary) {
      return []
    }
    const vocabularyHeader = [{ left: 'A', right: 'B' }]
    let vocabularyRows = vocabulary as any[]
    vocabularyRows = vocabularyHeader.concat(vocabularyRows)

    return vocabularyRows.map((e: any, i: number) => {
      return [
        { value: e.left, width: 200, readOnly: i === 0, className: 'left' },
        { value: e.right, width: 200, readOnly: i === 0, className: 'right' },
      ]
    })
  }
  // #endregion

  // #region codepen
  private codepenPlusButtonClick = () => {
    const { note } = this.props.selectedData
    if (!_.isEmpty(note?.codepenUrl)) {
      console.log('already exists')
      return
    }
    this.props.openModal(SetCodepenModal)
  }
  private codepenExportButtonClick = () => {
    const { note } = this.props.selectedData
    if (_.isEmpty(note?.codepenUrl)) {
      console.log('no data')
      return
    }
    this.props.openModal(SetCodepenModal, { isExport: true })
  }
  private codepenChangeButtonClick = () => {
    const { note } = this.props.selectedData
    if (_.isEmpty(note?.codepenUrl)) {
      console.log('no data')
      return
    }
    this.props.openModal(SetCodepenModal, { isChange: true })
  }
  // #endregion

  private exportFile(fileName: string, exportData: any) {
    const downLoadLink = document.createElement('a')
    downLoadLink.download = fileName
    downLoadLink.href = URL.createObjectURL(new Blob([exportData], { type: 'text.plain' }))
    downLoadLink.dataset.downloadurl = [
      'text.plain',
      downLoadLink.download,
      downLoadLink.href,
    ].join(':')
    downLoadLink.click()
  }
  // #endregion

  // #region render
  render() {
    const { category, note } = this.props.selectedData
    const { isInputViewShown, currentTab } = this.state
    const serializedVocabulary = this.serializeVocabulary(note?.vocabulary)

    if (_.isEmpty(category) || _.isEmpty(note)) {
      return (
        <div>
          Please select category and note at the <Link to="/home">HomePage</Link>
        </div>
      )
    }

    return (
      <>
        <Tabs
          tabs={Object.keys(this.operationMenuObj)}
          currentTab={currentTab}
          changeTab={(tab: string) => this.setState({ currentTab: tab })}
        />
        <OperationMenu obj={this.operationMenuObj[currentTab]} />

        {currentTab === 'memo' && (
          <>
            {_.isEmpty(note?.content) ? (
              <div>please create note with right + button</div>
            ) : (
              <>
                {isInputViewShown ? (
                  <textarea
                    style={{ backgroundColor: '#FFF4E0' }}
                    cols={30}
                    rows={10}
                    onChange={this.handleChangeMemo}
                    value={note?.content}
                  />
                ) : (
                  <Markdown source={note.content} />
                )}
              </>
            )}
          </>
        )}
        {currentTab === 'vocabulary' && (
          <>
            {_.isEmpty(note?.vocabulary) ? (
              <div>please create vocabulary with right + button</div>
            ) : (
              <div style={{ backgroundColor: 'white', display: 'inline-block' }}>
                <ReactDataSheet
                  data={serializedVocabulary}
                  valueRenderer={(cell: any, r: number, c: number) => {
                    cell.className = this.state.hideMode && c === 1 ? 'left' : ''
                    cell.width = 200
                    return cell.value
                  }}
                  onCellsChanged={changes => {
                    this.handleChangeVocabulary(changes)
                  }}
                />
              </div>
            )}
          </>
          //<ReactDataSheet data={this.state.grid2} valueRenderer={(cell: any) => cell.value} />
        )}
        {currentTab === 'codepen' && (
          <>
            {_.isEmpty(note?.codepenUrl) ? (
              <div>please input codepen'URL with right + button</div>
            ) : (
              <>
                <div>
                  <EmbeddedCodepen hash={this.codepenUrlToHash(note.codepenUrl)} />
                </div>
              </>
            )}
          </>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(NotePage)
