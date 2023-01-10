import * as React from 'react'

type Providers = React.FunctionComponent<{ children: React.ReactNode }>
type Children = { children: React.ReactNode }

const compose = (providers: Providers[]) =>
  providers.reduce(
    (Prev: Providers, Curr: Providers) =>
      ({ children }: Children) =>
        (
          <Prev>
            <Curr>{children}</Curr>
          </Prev>
        ),
  )

export default compose
