import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../../components/Button'
import User from '../../../../components/User'
import { UserT } from '../../../../context/types'
import styles from './listOfUsers.module.css'

type Props = {
  users: UserT[] | null
  title?: HTMLElement | ReactElement
}

const ListOfUsers = ({ users, title }: Props) => {
  const history = useHistory()

  return (
    <div className={styles.wrapper}>
      {title}
      {users && users.length > 0 && (
        <ul className={styles.users}>
          {users.map((user) => (
            <li key={user.id} className={styles.user}>
              <User name={user.name} avatarUrl={user.avatarUrl} />
              <span style={{ flex: 1 }} />
              <Button
                onClick={() => {
                  console.log('Fill out', user)
                  history.push(`/share-feedback/${user.id}`)
                }}
              >
                Fill out
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListOfUsers
