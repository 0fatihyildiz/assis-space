import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { LoadingContainer } from '@/Containers'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  console.log('main-render')

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={LoadingContainer}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
