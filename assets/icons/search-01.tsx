import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const Search01Icon = (props: React.ComponentProps<typeof Svg>) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M17.5 17.5L22 22"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </Svg>
)

export default Search01Icon
