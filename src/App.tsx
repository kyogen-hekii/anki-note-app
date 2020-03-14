import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store'

import DummyPage from './dev/DummyPage'
import PageHeader from './pages/Components/Header'
import HomePage from './pages/Home/HomePage'
import NotePage from './pages/Note/NotePage'
import Modal from './containers/Modal'

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <PageHeader />
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/login" component={DummyPage} />
        </Switch>
        <Switch>
          <Route exact path="/register" component={DummyPage} />
        </Switch>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Switch>
          <Route exact path="/home" component={HomePage} />
        </Switch>
        <Switch>
          <Route exact path="/note" component={NotePage} />
        </Switch>
        <Switch>
          <Route exact path="/profile" component={DummyPage} />
        </Switch>
        <Modal />
      </ConnectedRouter>
    </Provider>
  )
}
export default App
