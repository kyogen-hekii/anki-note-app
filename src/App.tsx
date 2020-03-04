import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store'

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => <div>hello</div>} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
// <Route exact path="/" component={hello}/>
