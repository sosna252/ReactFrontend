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
import PageLogin from './PageLogin';
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
      <br/>      
      <Switch>
      <Route exact path="/">
          <PageLogin></PageLogin>
        </Route>
        <Route exact path="/list">
          <PageOffersList></PageOffersList>
        </Route>
        <Route exact path="/new">
          <PageOfferCreate></PageOfferCreate>
        </Route>
      </Switch>
      <div className="down" style={{position:'relative', width: '1004px', margin: 'auto'}} />
      <div id="copyright">
					&copy; 2019/2020, <strong>React</strong> created by <strong>Flatly Team</strong>
			</div>
    </Router>
  </Provider>
)

export default App