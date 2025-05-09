import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

const AlertCircleIcon = (props: React.ComponentProps<typeof Svg>) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
    <Circle cx="12" cy="12" r="10" strokeWidth={1.5} />
    <Path
      d="M11.992 15H12.001"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 12L12 8"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default AlertCircleIcon
