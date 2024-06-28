import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const ratingDispatcher = (rating_type) => {
    store.dispatch({
      type: rating_type
    })
  }

  return (
    <div>
      <button onClick={() => ratingDispatcher('GOOD')}>good</button> 
      <button onClick={() => ratingDispatcher('OK')}>ok</button> 
      <button onClick={() => ratingDispatcher('BAD')}>bad</button>
      <button onClick={() => ratingDispatcher('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
