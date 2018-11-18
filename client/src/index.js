// NPM Packages
import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import {Provider} from 'react-redux'
import {
  createStore
  // applyMiddleware
} from 'redux'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import createSagaMiddleware from 'redux-saga'

// Global & third-party styles
import './common/globalStyles'
import 'react-virtualized/styles.css'
import 'react-datepicker/dist/react-datepicker.css'

// Store reducers & sagasn
import {
  rootReducer
  // rootSaga
} from './services/store'

// App component
import App from './App'

// Service worker
import {unregister} from './registerServiceWorker'

// const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  // composeWithDevTools(
  //   applyMiddleware(sagaMiddleware)
  // )
)
const history = createBrowserHistory()

// sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

unregister()
