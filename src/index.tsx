import './index.module.css'
import { worker } from './mocks/browser'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import UserProvider from './context/UserProvider'
import QuestionProvider from './context/QuestionProvider'
import AccountProvider from './context/AccountProvider'
import SubmittedFeedbackProvider from './context/SubmittedFeedbackProvider'
import compose from './context/compose'

worker.start({ onUnhandledRequest: 'bypass' }).then(() => {
  const Providers = compose([
    AccountProvider,
    UserProvider,
    QuestionProvider,
    SubmittedFeedbackProvider,
  ])

  ReactDOM.render(
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>,
    document.getElementById('root'),
  )
})

reportWebVitals()
