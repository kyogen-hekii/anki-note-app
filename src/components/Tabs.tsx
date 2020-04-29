import React from 'react'
import TabButton from './TabButton'

type Props = { currentTab: string; tabs: string[]; changeTab: Function }

export default ({ currentTab, tabs, changeTab }: Props) => {
  return (
    <div>
      <div style={{ display: 'flex', overflowX: 'scroll' }}>
        {tabs.map((tab: string) => {
          return (
            <TabButton
              key={tab}
              onClick={() => {
                changeTab(tab)
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
