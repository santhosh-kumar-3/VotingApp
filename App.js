import AppNavigation from './scr/navigation/AppNavigation';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  const [isFirstLaunch,setIsFirstLaunch] = useState(null)

  useEffect ( () => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched')
      if (hasLaunched === null) {
        setIsFirstLaunch(true)
        await AsyncStorage.setItem('hasLaunched', 'true')
      } else {
        setIsFirstLaunch(false)
      }
    }
    checkFirstLaunch()
  }, [])

  if (isFirstLaunch === null) {
    return null
  }

  return (
   <NavigationContainer>
      <AppNavigation initialRoute={isFirstLaunch ? 'Onboarding' : 'Home'}/>
   </NavigationContainer>
  );
}
