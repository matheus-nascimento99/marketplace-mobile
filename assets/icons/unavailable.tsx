import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface UnavailableIconProps extends SvgProps {
  color?: string
}

const UnavailableIcon: React.FC<UnavailableIconProps> = ({
  color = '#000',
  ...props
}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M5.25 5L19.25 19"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.25 12C22.25 6.47715 17.7728 2 12.25 2C6.72715 2 2.25 6.47715 2.25 12C2.25 17.5228 6.72715 22 12.25 22C17.7728 22 22.25 17.5228 22.25 12Z"
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
)

export default UnavailableIcon
