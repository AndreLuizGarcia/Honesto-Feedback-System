import * as React from 'react'
import { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {}

const BackArrow = (props: Props) => (
  <svg
    width={8}
    height={13}
    viewBox="0 0 8 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#59636E"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 11.7L6.66667 13L0 6.5L6.66667 0L8 1.3L2.70833 6.5L8 11.7Z"
      fill="currentColor"
    />
  </svg>
)

export default BackArrow
