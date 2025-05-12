import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const Cancel01Icon = (props: React.ComponentProps<typeof Svg>) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
    <Path
      d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default Cancel01Icon
