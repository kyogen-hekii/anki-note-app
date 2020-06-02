import React, { Component } from 'react'
import Markdown from 'react-markdown'
import { setNote } from '../../api/queries'
import { connect } from 'react-redux'
import { openModal } from '../../reducers/modal'
import { openToast } from '../../reducers/toast'
import { saveToStore } from '../../utils/createVariantReducer'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import ReactDataSheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css'
import SetCodepenModal from './containers/SetCodepenModal'
import OperationMenu from '../../components/OperationMenu'
import Tabs from '../../components/Tabs'
import EmbeddedCodepen from './components/EmbeddedCodepen'
import { parseVocabulary, serializeVocabulary } from '../Common/vocabulary'
import SetExportModal from './containers/SetExportModal'
import TextZone from '../../components/TextZone'

type Props = {
  history: any
  auth: any
  page: any
  selectedData: any
  openModal: Function
  openToast: Function
  saveToStore: Function
}
class NotePage extends Component<Props> {
  // #region state
  state: any = {
    currentTab: 'memo',
    isInputViewShown: true,
    createdNewMemo: false,
    hideMode: false,
  }

  operationMenuObj: any = {
    memo: {
      onPlusButtonClick: () => {
        this.memoPlusButtonClick()
      },
      onExportButtonClick: () => {
        this.props.openModal(SetExportModal, { height: 60 }, this.memoExportButtonClick)
      },
      onChangeButtonClick: () => {
        this.memoChangeButtonClick()
      },
      isAble: {
        plus: this.isEditable(),
        export: true,
        change: this.isEditable(),
      },
    },
    vocabulary: {
      onPlusButtonClick: () => {
        this.vocabularyPlusButtonClick()
      },
      onExportButtonClick: () => {
        this.props.openModal(SetExportModal, { height: 60 }, this.vocabularyExportButtonClick)
      },
      onChangeButtonClick: () => {
        this.vocabularyChangeButtonClick()
      },
      isAble: {
        plus: this.isEditable(),
        export: true,
        change: true,
      },
    },
    codepen: {
      onPlusButtonClick: () => {
        this.codepenPlusButtonClick()
      },
      onExportButtonClick: () => {
        this.codepenExportButtonClick()
        //this.props.openModal(SetExportModal, { height: 60 }, this.codepenExportButtonClick)
      },
      onChangeButtonClick: () => {
        this.codepenChangeButtonClick()
      },
      isAble: {
        plus: this.isEditable(),
        export: true,
        change: this.isEditable(),
      },
    },
  }
  // #endregion

  // #region componentDidMount
  componentDidMount() {
    this.setState({
      currentTab: Object.keys(this.operationMenuObj)[0],
      isInputViewShown: this.isEditable(),
    })

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
    const serializedVocabulary = this.createSerializeVocabulary(vocabulary, changes)
    this.props.saveToStore(
      'selectedData',
      'note',
      { ...note, vocabulary: parseVocabulary(note, serializedVocabulary) },
      setNote,
    )
  }
  // #endregion

  // #region private method

  // #region memo
  memoPlusButtonClick = () => {
    const { note } = this.props.selectedData
    if (!_.isEmpty(note?.content)) {
      this.props.openToast('すでに存在します')
      return
    }
    this.props.saveToStore('selectedData', 'note', {
      ...note,
      content: 'please input markdown memo',
    })
    this.setState({ createdNewMemo: true })
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
      this.props.saveToStore('selectedData', 'note', { ...note, vocabulary: [] })
    }
    this.addVocabularyRows({ isFirst: false })
  }
  vocabularyExportButtonClick = async () => {
    await this.deleteEmptyRows()
    const { note } = this.props.selectedData
    const { vocabulary } = note

    if (!vocabulary) {
      this.props.openToast('データがありません')
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
    this.props.openToast(!hideMode ? 'クイズモード' : '解除')
    this.setState({ hideMode: !hideMode })
  }
  // #endregion

  // #region vocabulary rows
  private createSerializeVocabulary = (
    vocabulary: any,
    changes: ReactDataSheet.CellsChangedArgs<any, string>,
  ) => {
    const serializedVocabulary = serializeVocabulary(vocabulary, this.isEditable())
    changes.forEach(({ cell, row, col, value }) => {
      serializedVocabulary[row][col] = { ...serializedVocabulary[row][col], value }
    })
    return serializedVocabulary
  }

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
    let vocabularyRows = vocabulary || ([] as any[])

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
  // #endregion

  // #region codepen
  private codepenPlusButtonClick = () => {
    const { note } = this.props.selectedData
    if (!_.isEmpty(note?.codepenUrl)) {
      this.props.openToast('すでに存在します')
      return
    }
    this.props.openModal(SetCodepenModal, { height: 100 })
  }
  private codepenExportButtonClick = () => {
    const { note } = this.props.selectedData
    if (_.isEmpty(note?.codepenUrl)) {
      this.props.openToast('追加してください')
      return
    }
    this.props.openModal(SetCodepenModal, { height: 60, isExport: true })
  }
  private codepenChangeButtonClick = () => {
    const { note } = this.props.selectedData
    if (_.isEmpty(note?.codepenUrl)) {
      this.props.openToast('追加してください')
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
  private isEditable() {
    const {
      auth: { user },
      selectedData: { note },
    } = this.props
    return _.isEmpty(note?.author) || note?.author === user?.displayName
  }

  // #endregion

  // #region render
  render() {
    const { category, note } = this.props.selectedData
    const { isInputViewShown, currentTab, createdNewMemo } = this.state
    const serializedVocabulary = serializeVocabulary(note?.vocabulary, this.isEditable())

    if (_.isEmpty(category) || _.isEmpty(note)) {
      return (
        <div>
          <Link to="/home">
            <TextZone className="m20" text="お手数ですがHOMEから操作を開始してください" />
          </Link>
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
            {!note?.content && !createdNewMemo ? (
              <TextZone className="m20" text="右の+でmemo作成" />
            ) : (
              <>
                {isInputViewShown ? (
                  <textarea
                    className="m20"
                    style={{
                      color: '#5d627b',
                      background: 'white',
                      borderTop: 'solid 5px #5d627b',
                      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.22)',
                      minHeight: '64vh',
                      width: 'calc(99vw - 40px - 4rem)',
                      overflowY: 'auto',
                      marginBottom: '8rem',
                      marginRight: '4rem',
                    }}
                    readOnly={false}
                    cols={30}
                    rows={10}
                    onChange={this.handleChangeMemo}
                    value={note?.content}
                  />
                ) : (
                  <div
                    className="m20"
                    style={{
                      color: '#5d627b',
                      background: '#EFEFEF',
                      borderTop: 'solid 5px #5d627b',
                      boxShadow: '0 3px 5px rgba(0, 0, 0, 0.22)',
                      minHeight: '64vh',
                      width: 'calc(99vw - 40px - 4rem)',
                      overflowY: 'auto',
                      marginBottom: '8rem',
                      marginRight: '4rem',
                    }}
                  >
                    <Markdown source={note.content} />
                  </div>
                )}
              </>
            )}
          </>
        )}
        {currentTab === 'vocabulary' && (
          <>
            {_.isEmpty(note?.vocabulary) ? (
              <TextZone className="m20" text="右の+でvocabulary作成" />
            ) : (
              <div
                className="m20"
                style={{
                  backgroundColor: 'white',
                  display: 'inline-block',
                  maxWidth: 'calc(100vw - 40px - 4rem)',
                  //overflowX: 'auto',
                }}
              >
                <ReactDataSheet
                  data={serializedVocabulary}
                  valueRenderer={(cell: any, r: number, c: number) => {
                    cell.className =
                      (this.state.hideMode && 0 < r && c === 1 ? 'right' : '') + ' limit'
                    // widthはmax-widthで指定する必要があり、プロパティはないため、classNameで指定
                    // cell.width = 'calc((100vw - 40px - 4rem)/2)'
                    cell.overflow = 'clip'
                    return cell.value
                  }}
                  onCellsChanged={(changes) => {
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
              <TextZone className="m20" text="右の+でcodepen作成" />
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
  auth: state.auth,
  page: state.page,
  selectedData: state.selectedData,
})

const mapDispatchToProps = {
  saveToStore,
  openModal,
  openToast,
}

export default connect(mapStateToProps, mapDispatchToProps)(NotePage)
