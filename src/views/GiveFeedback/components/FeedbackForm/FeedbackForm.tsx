import * as React from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../../../components/Button'
import MultipleChoice from '../../../../components/MultipleChoice'
import Progress from '../../../../components/Progress'
import Scale from '../../../../components/Scale'
import TextArea from '../../../../components/TextArea'
import User from '../../../../components/User'
import { AccountContext } from '../../../../context/AccountProvider'
import {
  QuestionContext,
  Question2T,
} from '../../../../context/QuestionProvider'
import {
  DispatchSubmittedFeedbackContext,
  SubmittedFeedback,
  SubmittedFeedbackContext,
} from '../../../../context/SubmittedFeedbackProvider'

import { UserContext } from '../../../../context/UserProvider'
import ListOfUsers from '../ListOfUsers'
import styles from './feedbackForm.module.css'

type Answers = {
  [key: string]: string | number
}

const FeedbackForm = () => {
  const { id } = useParams<{ id: string | undefined }>()

  const { usersThatDidntReceiveFeedbackAndAreNotLogged } = React.useContext(
    SubmittedFeedbackContext,
  )
  const setSubmittedFeedback = React.useContext(
    DispatchSubmittedFeedbackContext,
  )
  const questions = React.useContext(QuestionContext)
  const users = React.useContext(UserContext)
  const loggedUser = React.useContext(AccountContext)

  const [answers, setAnswers] = React.useState<Answers>({})
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [view, setView] = React.useState<'THANKS' | 'FORM'>('FORM')
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false)

  React.useEffect(() => {
    setView('FORM')
  }, [id])

  React.useEffect(() => {
    //INFO: Need wait to answers state be updated with the last answer before submit
    if (Object.keys(answers).length === questions?.length && isSubmittingForm) {
      submitForm()
      resetForm()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, questions, isSubmittingForm])

  const userReceivingFeedback = users?.find((user) => user.id === id)
  const currentQuestion = questions![currentIndex]

  const questionComponent = {
    scale: (
      <div className={styles.scaleWrapper}>
        <Scale
          initialValue={(answers?.[currentQuestion.id] as number) || 0}
          handleUpdateValue={updateAnswers}
          name={currentQuestion.id}
        />
      </div>
    ),
    multipleChoice: (
      <MultipleChoice
        initialValue={(answers?.[currentQuestion.id] as number) || null}
        options={(currentQuestion as Question2T).options}
        onChange={updateAnswers}
      />
    ),
    text: (
      <TextArea
        initialValue={
          answers?.[currentQuestion.id] === 'SKIPPED'
            ? ''
            : (answers?.[currentQuestion.id] as string)
        }
        handleUpdateValue={updateAnswers}
      />
    ),
  }

  function updateAnswers(fields: string | number) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: fields }))
  }

  function resetForm() {
    setCurrentIndex(0)
    setView('THANKS')
    setAnswers({})
    setIsSubmittingForm(false)
  }

  function submitForm() {
    const answerToSubmit = {
      fromId: loggedUser!.id,
      toId: id!,
      answers: answers,
    }

    setSubmittedFeedback((prev: SubmittedFeedback[]) => [
      ...prev,
      answerToSubmit,
    ])
  }

  function handleNextAndSkipButton(type: 'SKIP' | 'NEXT') {
    if (type === 'SKIP') {
      updateAnswers('SKIPPED')
    }

    if (currentIndex < questions!.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      return
    }

    setIsSubmittingForm(true)
  }

  function handleBackButton() {
    setCurrentIndex((prev) => prev - 1)
  }

  if (view === 'THANKS') {
    return (
      <ListOfUsers
        users={usersThatDidntReceiveFeedbackAndAreNotLogged}
        title={<ListOfUsersTitle />}
      />
    )
  }

  return (
    <form className={styles.form}>
      <fieldset>
        <div>
          <div>
            <h1>{currentQuestion.label}</h1>
            <h2>Share your feedback for {userReceivingFeedback?.name}</h2>
          </div>
          <User avatarUrl={userReceivingFeedback?.avatarUrl} />
        </div>
        <div className={styles.questionsWrapper}>
          <div className={styles.questions}>
            {questionComponent[currentQuestion.type]}
          </div>
          <div className={styles.controls}>
            <Button disabled={currentIndex === 0} onClick={handleBackButton}>
              Previous
            </Button>
            <Button
              secondary
              disabled={currentQuestion.required}
              onClick={() => handleNextAndSkipButton('SKIP')}
            >
              Skip
            </Button>
            <Button
              disabled={!answers[currentQuestion.id]}
              onClick={() => handleNextAndSkipButton('NEXT')}
            >
              {currentIndex < questions!.length - 1 ? 'Next' : 'Finish'}
            </Button>
          </div>
          <Progress
            labelText="Questions Completed"
            totalItems={questions!.length}
            completedItems={currentIndex}
          />
        </div>
      </fieldset>
    </form>
  )
}

export default FeedbackForm

const ListOfUsersTitle = () => {
  return (
    <>
      <h1 className={styles.titleListUser}>
        Thank you for sharing your feedback!
      </h1>
      <h2 className={styles.subtitleListUser}>
        Continue to give feedback to other team members.
      </h2>
    </>
  )
}
