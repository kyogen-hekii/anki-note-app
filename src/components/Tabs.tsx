import React from 'react'
import { connect } from 'react-redux'

import { saveToStore } from '../utils/createVariantReducer'
import TabButton from './TabButton'

type Props = { currentTab: string; tabs: string[]; saveToStore: Function }

const Tabs = ({ currentTab, tabs, saveToStore }: Props) => {
  return (
    <div>
      <div style={{ display: 'flex', overflowX: 'scroll' }}>
        {tabs.map((tab: string) => {
          return (
            <TabButton
              key={tab}
              onClick={() => {
                saveToStore('page', 'currentTab', tab)
              }}
              className="touchable"
              style={{
                backgroundColor: currentTab === tab ? '#FCAA00' : '#757575',
                color: currentTab === tab ? '#757575' : 'white',
              }}
            >
              {tab}
            </TabButton>
          )
        })}
      </div>
    </div>
  )
}

// extends Component<Props>
const mapStateToProps = (state: any, ownProps: any) => ({
  currentTab: state.page.currentTab,
  tabs: ownProps.tabs,
})
const mapDispatchToProps = {
  saveToStore,
}
export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
