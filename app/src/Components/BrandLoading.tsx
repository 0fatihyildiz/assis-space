import React, { useEffect } from 'react'
import { View, Image } from 'react-native'

import { useTheme } from '@/Hooks'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  height?: number
  width?: number
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center'
}

const BrandLoading = ({ height, width, mode }: Props) => {
  const { Layout, Images } = useTheme()
  const transform = useSharedValue(0)

  const fingerOneStyle = useAnimatedStyle(() => {
    if (transform.value >= 0 && transform.value < 20) {
      return {
        left: -(width! / 15) - transform.value / 2,
        top: (height! / 10) * 1.9 - transform.value / 2,
      }
    } else if (transform.value >= 20 && transform.value < 40) {
      return {
        left: -(width! / 15) - (40 - transform.value) / 2,
        top: (height! / 10) * 1.9 - (40 - transform.value) / 2,
      }
    } else {
      return {
        left: -(width! / 15),
        top: (height! / 10) * 1.9,
      }
    }
  }, [])

  const fingerTwoStyle = useAnimatedStyle(() => {
    if (transform.value >= 20 && transform.value < 40) {
      return {
        top: -10 - (transform.value - 20) / 2,
        left: width! / 5.25 - (transform.value - 20) / 4,
      }
    } else if (transform.value >= 40 && transform.value < 60) {
      return {
        top: -10 - (60 - transform.value) / 2,
        left: width! / 5.25 - (60 - transform.value) / 4,
      }
    } else {
      return {
        top: -10,
        left: width! / 5.25,
      }
    }
  })

  const fingerThreeStyle = useAnimatedStyle(() => {
    if (transform.value >= 40 && transform.value < 60) {
      return {
        top: -10 - (transform.value - 40) / 2,
        right: width! / 5.25 - (transform.value - 40) / 4,
      }
    } else if (transform.value >= 60 && transform.value < 80) {
      return {
        top: -10 - (80 - transform.value) / 2,
        right: width! / 5.25 - (80 - transform.value) / 4,
      }
    } else {
      return {
        top: -10,
        right: width! / 5.25,
      }
    }
  })

  const fingerFourStyle = useAnimatedStyle(() => {
    if (transform.value >= 60 && transform.value < 80) {
      return {
        right: -(width! / 15) - (transform.value - 60) / 2,
        top: (height! / 10) * 1.9 - (transform.value - 60) / 2,
      }
    } else if (transform.value >= 80 && transform.value < 100) {
      return {
        right: -(width! / 15) - (100 - transform.value) / 2,
        top: (height! / 10) * 1.9 - (100 - transform.value) / 2,
      }
    } else {
      return {
        right: -(width! / 15),
        top: (height! / 10) * 1.9,
      }
    }
  })

  useEffect(() => {
    transform.value = withRepeat(
      withTiming(100, {
        duration: 1000,
        easing: Easing.linear,
      }),
      Infinity,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View>
      <View>
        <Animated.Image
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              height: height! / 3.5,
              width: width! / 3.5,
              position: 'absolute',
              left: -(width! / 15),
              top: (height! / 10) * 1.9,
            },
            fingerOneStyle,
          ]}
          source={Images.leftFinger}
          resizeMode={mode}
        />
        <Animated.Image
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              height: height! / 3.5,
              width: width! / 3.5,
              position: 'absolute',
              left: width! / 5.25,
              top: -10,
            },
            fingerTwoStyle,
          ]}
          source={Images.leftFinger}
          resizeMode={mode}
        />
        <Animated.Image
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              height: height! / 3.5,
              width: width! / 3.5,
              position: 'absolute',
              right: width! / 5.25,
              top: -10,
            },
            fingerThreeStyle,
          ]}
          source={Images.rightFinger}
          resizeMode={mode}
        />
        <Animated.Image
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              height: height! / 3.5,
              width: width! / 3.5,
              position: 'absolute',
              right: -(width! / 15),
              top: (height! / 10) * 1.9,
            },
            fingerFourStyle,
          ]}
          source={Images.rightFinger}
          resizeMode={mode}
        />
      </View>
      <View style={[{ height, width }, Layout.colCenter]}>
        <Image
          style={Layout.mediumSize}
          source={Images.head}
          resizeMode={mode}
        />
      </View>
    </View>
  )
}

BrandLoading.defaultProps = {
  height: 150,
  width: 150,
  mode: 'contain',
}

export default BrandLoading
