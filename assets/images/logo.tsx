import * as React from 'react'
import { View, ViewProps } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const Logo = (props: ViewProps) => (
  <View className="inset-0 content-center items-center" {...props}>
    <Svg width={91} height={69} fill="none">
      <Path
        fill="#5EC5FD"
        d="M53.364 67.463a4.01 4.01 0 0 0 5.686 0l30.148-30.322a3.996 3.996 0 0 0 0-5.637L59.05 1.182a4.01 4.01 0 0 0-5.686 0L44.69 9.906c8.067 5.147 13.415 14.16 13.415 24.417 0 10.257-5.348 19.27-13.415 24.416l8.674 8.724Z"
      />
      <Path
        fill="#F24D0D"
        fillRule="evenodd"
        d="M44.69 9.872 23.218 31.468a4 4 0 0 0 0 5.64L44.69 58.705a28.978 28.978 0 0 1-15.637 4.55C13.006 63.254 0 50.284 0 34.287 0 18.291 13.007 5.323 29.052 5.323A28.98 28.98 0 0 1 44.69 9.872Z"
        clipRule="evenodd"
      />
    </Svg>
  </View>
)
export default Logo
