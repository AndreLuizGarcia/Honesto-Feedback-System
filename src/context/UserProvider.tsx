import * as React from 'react'
import { UserT } from './types'

type DispatchUserContextT = any

export const DispatchUserContext =
  React.createContext<DispatchUserContextT | null>(null)
export const UserContext = React.createContext<UserT[] | null>(null)

type SetUsersT = {
  action: 'set'
  payload: UserT[]
}

const reducer = (state: UserT[] | null, update: SetUsersT): UserT[] | null => {
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
    <DispatchUserContext.Provider value={dispatch}>
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </DispatchUserContext.Provider>
  )
}

export default UIProvider
