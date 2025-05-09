import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface ViewOffIconProps extends SvgProps {}

const ViewOffIcon: React.FC<ViewOffIconProps> = ({ ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M22 8C22 8 18 14 12 14C6 14 2 8 2 8"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path d="M15 13.5L16.5 16" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M20 11L22 13" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 13L4 11" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 13.5L7.5 16" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)

export default ViewOffIcon
