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
import AppFooter from './Footer'
import "../style.css"

const store = createStore(rootReducer, {}, applyMiddleware(reduxLogger,reduxThunk))

const App = () => (
  <Provider store={store}>
    <Router>
      <AppHeader />
      <hr />      
      <div className="up" style={{position:'relative', width: '1004px', margin: 'auto'}}></div>
      <Switch>
        <Route exact path="/list">
          <PageOffersList></PageOffersList>
        </Route>
        <Route exact path="/new">
          <PageOfferCreate></PageOfferCreate>
        </Route>
        <Route exact path="/edit">
          <PageOfferCreate></PageOfferCreate>
        </Route>
      </Switch>
      <AppFooter />
      <div className="down" style={{position:'relative', width: '1004px', margin: 'auto'}} />
      <div id="copyright">
					&copy; 2020, <strong>React</strong> created by <em>Bookly</em>
				</div>
    </Router>
  </Provider>
)

export default App