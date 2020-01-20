import React from 'react'
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../redux/reducers'
import reduxThunk from 'redux-thunk'
import reduxLogger from 'redux-logger'

import PageOffersList from './PageOffersList';
import PageOfferCreate from './PageOfferCreate';
import AppHeader from './Header'

const store = createStore(rootReducer, {}, applyMiddleware(reduxLogger,reduxThunk))

const App = () => (
  <Provider store={store}>
    <Router>
      <AppHeader />
      <hr />
      <Switch>      
        <Route exact path="/list">
          <PageOffersList></PageOffersList>
        </Route>
        <Route exact path="/new">
          <PageOfferCreate></PageOfferCreate>
        </Route>
      </Switch>
    </Router>
  </Provider>
)

export default App