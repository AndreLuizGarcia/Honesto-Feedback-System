import * as React from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import User from '../../../../components/User'
import { SubmittedFeedbackContext } from '../../../../context/SubmittedFeedbackProvider'
import { UserContext } from '../../../../context/UserProvider'
import styles from './usersToList.module.css'
import classnames from 'classnames'

const UsersToList = () => {
  const { feedbackFromLoggedUser, feedbackToLoggedUser } = React.useContext(
    SubmittedFeedbackContext,
  )
  const users = React.useContext(UserContext)
  const { id } = useParams<{ id: string | undefined }>()
  const history = useHistory()
  const { pathname } = useLocation()
  const isTeamFeedbackPage = pathname.includes('/team-feedback')

  const feedback = isTeamFeedbackPage
    ? feedbackToLoggedUser
    : feedbackFromLoggedUser

  if (!id) {
    const firstUserToSelect = isTeamFeedbackPage
      ? `/team-feedback/${feedback[0].fromId}`
      : `/my-feedback/${feedback[0].toId}`
    history.push(firstUserToSelect)
  }

  const usersToList = feedback.map((submittedAnswer, index) => {
    const userGivenFeedback = users!.filter((user) =>
      isTeamFeedbackPage
        ? user.id === submittedAnswer.fromId
        : user.id === submittedAnswer.toId,
    )[0]

    const historyToPush = isTeamFeedbackPage
      ? `/team-feedback/${userGivenFeedback.id}`
      : `/my-feedback/${userGivenFeedback.id}`

    return (
      <li
        onClick={() => history.push(historyToPush)}
        key={`usersToList-${index}`}
        className={classnames(styles.user, {
          [styles.active]: userGivenFeedback.id === id,
        })}
      >
        <User
          name={userGivenFeedback.name}
          avatarUrl={userGivenFeedback.avatarUrl}
        />
      </li>
    )
  })

  return <>{usersToList}</>
}

export default UsersToList
