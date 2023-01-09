import * as React from 'react'

import { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {}

const Star = (props: Props) => {
  return (
    <svg
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#ACB1B6"
      {...props}
    >
      <title>Star Icon</title>
      <path
        d="M17.774 10.398L14.394 0L11.013 10.398H0L8.925 16.795L5.498 27.19L14.394 20.742L23.289 27.19L19.863 16.795L28.788 10.398H17.774ZM18.851 17.129L21.245 24.39L14.395 19.425L7.544 24.39L10.184 16.385L9.547 15.929L3.319 11.465H11.79L14.396 3.449L17.001 11.465H25.472L18.608 16.385L18.853 17.129H18.851Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default Star
