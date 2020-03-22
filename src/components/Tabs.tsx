import React from 'react'
import { connect } from 'react-redux'

import { saveToStore } from '../utils/createVariantReducer'
import TabButton from './TabButton'

type Props = { currentTab: string; tabs: string[]; saveToStore: Function }

const Tabs = ({ currentTab, tabs, saveToStore }: Props) => {
  console.log('currentTab: ', currentTab)
  console.log('tabs: ', tabs)
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
                backgroundColor: currentTab === tab ? 'white' : 'rgba(255, 255, 255, 0.4)',
                color: currentTab === tab ? '#FFC100' : 'white',
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
