import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <div>hello</div>} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
// <Route exact path="/" component={hello}/>
