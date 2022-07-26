import { View } from 'react-native'
import React from 'react'

import { useTheme } from '@/Hooks'
import { BrandLoading } from '@/Components'

const LoadingContainer = () => {
  const { Layout } = useTheme()

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <BrandLoading />
    </View>
  )
}

export default LoadingContainer
