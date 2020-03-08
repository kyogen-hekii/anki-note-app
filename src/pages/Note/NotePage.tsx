// state/cdm/handler/renderが入っている
import React, { Component } from 'react'
import SimpleFetch from '../../api/SimpleFetch'
import { getUser } from '../../api/queries'
import { connect } from 'react-redux'
import { openModal } from '../../reducers/modal'
import { saveToStore } from '../../utils/createVariantReducer'
import _ from 'lodash'
import ReactDataSheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css'

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
  }
  // #endregion

  // #region handler
  handleClickPopUser = () => {
    // TODO
    const { user } = this.state
    window.alert(`my name is ${user.name}`)
  }
  handleClickMemo = () => {
    this.setState({ currentTab: 'memo' })
  }
  handleClickVocabrary = () => {
    this.setState({ currentTab: 'vocabrary' })
  }
  handleClickCodepen = () => {
    this.setState({ currentTab: 'codepen' })
  }
  handleClickAdd = () => {
    this.props.openModal()
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

  // #region render
  render() {
    const { category, note } = this.props.selectedData
    const { currentTab } = this.state
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
          <button>+</button>
          <button>?</button>
        </div>

        <div>
          category: {category?.label}, note: {note?.title}
        </div>
        <div style={{ display: 'flex' }}>
          <button onClick={this.handleClickMemo}>memo</button>
          <button onClick={this.handleClickVocabrary}>vocabrary</button>
          <button onClick={this.handleClickCodepen}>codepen</button>
        </div>
        {currentTab === 'memo' && (
          <>
            {_.isEmpty(note?.content) ? (
              <button onClick={this.handleClickCreateMemo}>create</button>
            ) : (
              <textarea
                cols={30}
                rows={10}
                onChange={this.handleChangeMemo}
                value={note?.content}
              ></textarea>
            )}
          </>
        )}
        {currentTab === 'vocabrary' && (
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
            <button>create</button>
            <div>codepen</div>
          </>
        )}
        <div>
          <button onClick={this.handleClickAdd}>私のユーザー名は?</button>
        </div>
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
