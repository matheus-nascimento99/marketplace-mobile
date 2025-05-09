import { cssInterop } from 'react-native-css-interop'
import Svg, { Circle, Path, Rect } from 'react-native-svg'

cssInterop(Svg, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      width: true,
      height: true,
      stroke: true,
      strokeWidth: true,
      fill: true,
    },
  },
})
cssInterop(Circle, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      width: true,
      height: true,
      stroke: true,
      strokeWidth: true,
      fill: true,
    },
  },
})
cssInterop(Rect, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      width: true,
      height: true,
      stroke: true,
      strokeWidth: true,
      fill: true,
    },
  },
})
cssInterop(Path, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      width: true,
      height: true,
      stroke: true,
      strokeWidth: true,
      fill: true,
    },
  },
})
