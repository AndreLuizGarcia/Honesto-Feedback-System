import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './giveFeedback.module.css'
import { useHistory, useParams } from 'react-router-dom'
import ListOfUsers from './components/ListOfUsers'
import BackArrow from '../../components/Icons/BackArrow'
import FeedbackForm from './components/FeedbackForm'
import { SubmittedFeedbackContext } from '../../context/SubmittedFeedbackProvider'

const GiveFeedback = () => {
  const { usersThatDidntReceiveFeedbackAndAreNotLogged } = React.useContext(
    SubmittedFeedbackContext,
  )
  const { id } = useParams<{ id: string | undefined }>()

  return (
    <MainLayout loggedIn>
      {id ? (
        <GiveFeedbackWrapper />
      ) : (
        <ListOfUsers users={usersThatDidntReceiveFeedbackAndAreNotLogged} />
      )}
    </MainLayout>
  )
}

export default GiveFeedback

const GiveFeedbackWrapper = () => {
  const history = useHistory()

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.goBackButton}
        aria-label="Go to the previous page"
        onClick={() => history.push('/share-feedback')}
      >
        <BackArrow />
        BACK
      </button>
      <FeedbackForm />
    </div>
  )
}
