import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { PersistGate } from 'redux-persist/lib/integration/react'

import './Translations'
import { store, persistor } from '@/Store'
import { LoadingContainer } from './Containers'
import ApplicationNavigator from '@/Navigators/Application'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingContainer />} persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App
