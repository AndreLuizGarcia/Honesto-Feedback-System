import * as React from 'react'
import Scale from '../../../../components/Scale'
import styles from './answersToList.module.css'
import { SubmittedFeedbackContext } from '../../../../context/SubmittedFeedbackProvider'
import { QuestionContext } from '../../../../context/QuestionProvider'
import { useLocation, useParams } from 'react-router-dom'

const AnswersToList = () => {
  const { feedbackFromLoggedUser, feedbackToLoggedUser } = React.useContext(
    SubmittedFeedbackContext,
  )
  const { pathname } = useLocation()
  const isTeamFeedbackPage = pathname.includes('/team-feedback')

  const feedback = isTeamFeedbackPage
    ? feedbackToLoggedUser
    : feedbackFromLoggedUser

  const questions = React.useContext(QuestionContext)
  const { id } = useParams<{ id: string | undefined }>()

  const feedbackToSelectedUser = feedback.filter((submittedFeedback) =>
    isTeamFeedbackPage
      ? submittedFeedback.fromId === id
      : submittedFeedback.toId === id,
  )[0]!.answers

  const questionsWithAnswers = Object.keys(feedbackToSelectedUser).map(
    (questionId) => {
      const question = questions?.filter(
        (question) => question.id === questionId,
      )[0]

      const answerValue = feedbackToSelectedUser[questionId]

      const answerFromMultipleChoice =
        question?.type === 'multipleChoice'
          ? question?.options.filter(
              (option) => option.value === answerValue,
            )[0].label
          : null

      return {
        question: question,
        answers: answerFromMultipleChoice || answerValue,
      }
    },
  )

  const answersList = questionsWithAnswers.map((questionsWithAnswer, index) => {
    const { question, answers } = questionsWithAnswer

    const questionComponent: { [key: string]: JSX.Element | string | number } =
      {
        scale: (
          <div className={styles.scaleWrapper}>
            <Scale
              initialValue={answers as number}
              name={question!.id}
              disabled
            />
          </div>
        ),
        multipleChoice: answers,
        text: answers,
      }

    return (
      <li key={`AnswersList-${index}`} className={styles.answerLi}>
        <span className={styles.text}>{question?.label}</span>
        {answers === 'SKIPPED' ? (
          <span className={styles.skipped}>SKIPPED</span>
        ) : (
          <span className={styles.text}>
            {questionComponent[question?.type as string]}
          </span>
        )}
      </li>
    )
  })

  return <>{answersList}</>
}

export default AnswersToList
