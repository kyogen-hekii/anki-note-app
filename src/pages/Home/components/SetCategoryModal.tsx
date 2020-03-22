import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pascalize, camelize } from 'humps'
import _ from 'lodash'
import { closeModal } from '../../../reducers/modal'
import { saveToStore } from '../../../utils/createVariantReducer'
import { setCategory, getCategories } from '../../../api/queries'

type Props = {
  id: number
  selectedData: any
  callBack: any
  saveToStore: Function
  closeModal: Function
}
class SetModal extends Component<Props> {
  state: any = {
    categoryName: '',
  }
  handleClick = async (e: any) => {
    e.preventDefault()
    const { categoryName } = this.state
    if (_.isEmpty(categoryName)) {
      this.props.closeModal()
      return
    }
    const maxId = (await getCategories()).map(c => c.id).reduce((p, r) => Math.max(p, r))
    const newCategory = {
      id: maxId + 1,
      value: camelize(categoryName),
      label: pascalize(categoryName),
    }
    await setCategory(newCategory)
    this.props.saveToStore('selectedData', 'category', newCategory)

    const { callBack }: any = this.props
    callBack && (await callBack())
    this.props.closeModal()
  }
  handleCategoryChange = (e: any) => {
    const { value } = e.target
    this.setState({ categoryName: value })
  }

  render() {
    const { codepenUrl } = this.state
    return (
      <div className={`align-center`}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            value={codepenUrl}
            placeholder="e.g.) React, Vue.js..."
            onChange={this.handleCategoryChange}
            autoFocus
          />
          <button
            // onClick={() => {dispatch(closeModal())}} ※事前に dispatch = useDispatch()
            onClick={this.handleClick}
          >
            click me
          </button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: any) => ({
  selectedData: state.selectedData,
  page: state.page,
})

const mapDispatchToProps = {
  saveToStore,
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetModal)
