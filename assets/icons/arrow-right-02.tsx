import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const ArrowRight02Icon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 24 24" height={24} width={24} fill="none" {...props}>
      <Path
        d="M20.0001 11.9998L4.00012 11.9998"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.0003 17C15.0003 17 20.0002 13.3176 20.0002 12C20.0002 10.6824 15.0002 7 15.0002 7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
