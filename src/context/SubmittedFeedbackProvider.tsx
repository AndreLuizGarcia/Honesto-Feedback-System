import * as React from 'react'
import { AccountContext } from './AccountProvider'
import { UserT } from './types'
import { UserContext } from './UserProvider'

export type SubmittedFeedback = {
  fromId: string
  toId: string
  answers: {
    [key: string]: string | number
  }
}

type SubmittedFeedbackContextType = {
  submittedFeedback: Array<SubmittedFeedback>
  feedbackFromLoggedUser: Array<SubmittedFeedback>
  feedbackToLoggedUser: Array<SubmittedFeedback>
  usersThatDidntReceiveFeedbackAndAreNotLogged: Array<UserT>
}

export const DispatchSubmittedFeedbackContext = React.createContext<any | null>(
  null,
)
export const SubmittedFeedbackContext =
  React.createContext<SubmittedFeedbackContextType>({
    submittedFeedback: [],
    feedbackFromLoggedUser: [],
    feedbackToLoggedUser: [],
    usersThatDidntReceiveFeedbackAndAreNotLogged: [],
  })

const UIProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const loggedUser = React.useContext(AccountContext)
  const users = React.useContext(UserContext)
  const [submittedFeedback, setSubmittedFeedback] = React.useState<
    Array<SubmittedFeedback>
  >([])

  const feedbackFromLoggedUser = submittedFeedback.filter(
    (submittedFeedback) => submittedFeedback.fromId === loggedUser?.id,
  )
  const feedbackToLoggedUser = submittedFeedback.filter(
    (submittedFeedback) => submittedFeedback.toId === loggedUser?.id,
  )

  const usersThatDidntReceiveFeedbackAndAreNotLogged =
    users?.filter(
      (user) =>
        user.id !== loggedUser?.id &&
        !submittedFeedback?.some(
          (submittedFeedback) =>
            submittedFeedback.toId === user.id &&
            submittedFeedback.fromId === loggedUser?.id,
        ),
    ) || []

  return (
    <DispatchSubmittedFeedbackContext.Provider value={setSubmittedFeedback}>
      <SubmittedFeedbackContext.Provider
        value={{
          submittedFeedback,
          feedbackFromLoggedUser,
          feedbackToLoggedUser,
          usersThatDidntReceiveFeedbackAndAreNotLogged,
        }}
      >
        {children}
      </SubmittedFeedbackContext.Provider>
    </DispatchSubmittedFeedbackContext.Provider>
  )
}

export default UIProvider
