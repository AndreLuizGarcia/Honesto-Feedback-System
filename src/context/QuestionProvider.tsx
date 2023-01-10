import * as React from 'react'

export type QuestionT = {
  id: string
  type: 'scale' | 'text'
  required: boolean
  label: string
}

export type Question2T = Omit<QuestionT, 'type'> & {
  type: 'multipleChoice'
  options: {
    label: string
    value: number
  }[]
}

type Question = QuestionT | Question2T

type DispatchQuestionContextT = any

export const DispatchQuestionContext =
  React.createContext<DispatchQuestionContextT | null>(null)
export const QuestionContext = React.createContext<Array<Question> | null>(null)

type SetQuestionsT = {
  action: 'set'
  payload: Array<Question>
}

const reducer = (
  state: Array<Question> | null,
  update: SetQuestionsT,
): Array<Question> | null => {
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, [])

  return (
    <DispatchQuestionContext.Provider value={dispatch}>
      <QuestionContext.Provider value={state}>
        {children}
      </QuestionContext.Provider>
    </DispatchQuestionContext.Provider>
  )
}

export default UIProvider
