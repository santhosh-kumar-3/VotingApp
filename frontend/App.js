import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigation from './scr/navigation/AppNavigation'


export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // Load the Poppins fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await checkFirstLaunch();
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
  
    prepare();
  }, [fontsLoaded]);
  
  const checkFirstLaunch = async () => {
    const hasLaunched = await AsyncStorage.getItem('hasLaunched');
    if (hasLaunched === null) {
      setIsFirstLaunch(true);
      await AsyncStorage.setItem('hasLaunched', 'true');
    } else {
      setIsFirstLaunch(false);
    }
  };

  if (!fontsLoaded || isFirstLaunch === null) {
    return null; 
  }

  return (
    <NavigationContainer>
      <AppNavigation initialRoute={isFirstLaunch ? 'Onboarding' : 'HomeTabs'} />
    </NavigationContainer>
  );
}
