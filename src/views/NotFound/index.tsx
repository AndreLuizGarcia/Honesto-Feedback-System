import { useHistory } from 'react-router-dom'
import Button from '../../components/Button'
import MainLayout from '../../layouts/MainLayout'
import styles from './notFound.module.css'

const NotFound = () => {
  const history = useHistory()
  return (
    <MainLayout>
      <div className={styles.notFound}>
        <h1>
          <span>404</span>
          <br />
          Sorry! The page you are looking for cannot be found. 😢
        </h1>
        <Button onClick={() => history.push('/share-feedback')}>
          Back to Share Feedback
        </Button>
      </div>
    </MainLayout>
  )
}

export default NotFound
