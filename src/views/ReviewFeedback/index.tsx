import * as React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import NoFeedback from '../../components/NoFeedback'
import { SubmittedFeedbackContext } from '../../context/SubmittedFeedbackProvider'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import AnswersToList from './components/AnswersToList'
import UsersToList from './components/UsersToList'
import styles from './reviewFeedback.module.css'

const ReviewFeedback = () => {
  const { feedbackFromLoggedUser, feedbackToLoggedUser } = React.useContext(
    SubmittedFeedbackContext,
  )
  const { pathname } = useLocation()

  const feedback = pathname.includes('/team-feedback')
    ? feedbackToLoggedUser
    : feedbackFromLoggedUser

  return (
    <MainLayout loggedIn>
      {feedback.length > 0 ? <ReviewFeedbackGiven /> : <NoFeedback />}
    </MainLayout>
  )
}

export default ReviewFeedback

const ReviewFeedbackGiven = () => {
  const users = React.useContext(UserContext)
  const { id } = useParams<{ id: string | undefined }>()

  const currentUser = users?.filter((user) => user.id === id)[0]

  return (
    <>
      <h1>My Feedback</h1>

      <div className={styles.feedbackContainer}>
        <ul className={styles.users}>
          <li>
            <h3>Feedback given</h3>
          </li>
          <UsersToList />
        </ul>
        {id ? (
          <ul className={styles.feedback}>
            <li>
              <h2>{currentUser?.name}'s Feedback</h2>
            </li>
            <AnswersToList />
          </ul>
        ) : (
          <span>Select a user to see the feedback</span>
        )}
      </div>
    </>
  )
}
