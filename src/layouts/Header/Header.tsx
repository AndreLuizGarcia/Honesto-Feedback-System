import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import { SubmittedFeedbackContext } from '../../context/SubmittedFeedbackProvider'
import User from '../../components/User'

const Header = () => {
  const loggedUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)
  const {
    feedbackFromLoggedUser,
    feedbackToLoggedUser,
    usersThatDidntReceiveFeedbackAndAreNotLogged,
  } = React.useContext(SubmittedFeedbackContext)

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }

  return (
    <div className={styles.header}>
      <h1>Honesto</h1>
      <NavLink
        to="/share-feedback"
        activeClassName={styles.active}
        className={styles.displayFlex}
      >
        Share Feedback
        {usersThatDidntReceiveFeedbackAndAreNotLogged?.length ? (
          <span className={styles.badge}>
            {usersThatDidntReceiveFeedbackAndAreNotLogged.length}
          </span>
        ) : null}
      </NavLink>
      <NavLink
        to="/my-feedback"
        activeClassName={styles.active}
        className={styles.displayFlex}
      >
        My Feedback
        {feedbackFromLoggedUser?.length ? (
          <span className={styles.badge}>{feedbackFromLoggedUser.length}</span>
        ) : null}
      </NavLink>
      <NavLink
        to="/team-feedback"
        activeClassName={styles.active}
        className={styles.displayFlex}
      >
        Team Feedback
        {feedbackToLoggedUser?.length ? (
          <span className={styles.badge}>{feedbackToLoggedUser.length}</span>
        ) : null}
      </NavLink>
      <span className={styles.spacer} />
      <div className={styles.logout}>
        <User
          avatarUrl={loggedUser?.avatarUrl}
          name={loggedUser?.name}
          displayName={false}
        />
        <div>
          <span>{loggedUser?.name}</span>
          <NavLink exact to="/" onClick={handleLogout}>
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  )
}
export default Header
