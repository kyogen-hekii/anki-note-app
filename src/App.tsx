import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store'

import DummyPage from './dev/DummyPage'
import PageHeader from './pages/Common/components/Header'
import PageFooter from './pages/Common/components/Footer'
import HomePage from './pages/Home/HomePage'
import NotePage from './pages/Note/NotePage'
import AnkiPage from './pages/Anki/AnkiPage'
import AnkiGamePage from './pages/Anki/AnkiGamePage'
import Modal from './containers/Modal'
import Toast from './containers/Toast'
import Error from './containers/Error'
import AnkiPrivateGamePage from './pages/Anki/AnkiPrivateGamePage'
import AboutPage from './pages/About/AboutPage'

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <div
        style={{
          backgroundColor: '#F5F5F5',
          paddingBottom: 20,
          minHeight: '95vh',
        }}
      >
        <ConnectedRouter history={history}>
          <PageHeader />
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
            <Route exact path="/anki/:categoryId/:noteId/private" component={AnkiPrivateGamePage} />
            <Route exact path="/anki/:categoryId/:noteId" component={AnkiGamePage} />
            <Route exact path="/anki" component={AnkiPage} />
          </Switch>
          <Switch>
            <Route exact path="/about" component={AboutPage} />
          </Switch>
          <PageFooter />
          <Modal />
          <Toast />
          <Error />
        </ConnectedRouter>
      </div>
    </Provider>
  )
}
export default App
