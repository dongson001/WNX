import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/lib/createHashHistory'
import configureStore from './store/configureStore'
import Root from './containers/root'
import 'styles/index.less'
import { syncReduxAndRouter } from 'redux-simple-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
// import Oxygen from 'hooks/oxygen'

const store = configureStore()
const history = createHistory({
  queryKey: false
})
// inject oxygen services
// Oxygen.init()
// inject tap event system
injectTapEventPlugin()

syncReduxAndRouter(history, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
