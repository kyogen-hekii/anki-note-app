import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pascalize, camelize } from 'humps'
import _ from 'lodash'
import { closeModal } from '../../../reducers/modal'
import { saveToStore } from '../../../utils/createVariantReducer'
import { createCategory, getCategories } from '../../../api/queries'
import CommonButton from '../../../components/CommonButton'

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
    const maxId = (await getCategories()).map((c) => c.id).reduce((p, r) => Math.max(p, r))
    const newCategory = {
      id: maxId + 1,
      value: camelize(categoryName),
      label: pascalize(categoryName),
    }
    this.props.saveToStore('selectedData', 'category', newCategory)
    await createCategory(newCategory)

    const { callBack }: any = this.props
    callBack && callBack()
    this.props.closeModal()
  }
  handleCategoryChange = (e: any) => {
    e.preventDefault()
    const { value } = e.target
    this.setState({ categoryName: value })
  }

  render() {
    const { codepenUrl } = this.state
    return (
      <div className={`align-center`} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          className="mb10"
          type="text"
          value={codepenUrl}
          placeholder="e.g.) React, Vue.js..."
          onChange={this.handleCategoryChange}
          autoFocus
        />
        <CommonButton className="mb10" onClick={this.handleClick} label="作成" />
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
