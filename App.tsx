import { StatusBar } from 'expo-status-bar';
import { StatusBar as StatusBarAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Platform } from 'react-native';
import { DBProvider } from './store/DBContext';
import store from './store/store';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store} >
          <DBProvider>
            <Navigation colorScheme={colorScheme} />
            {Platform.OS === 'ios' && < StatusBar />}
            {Platform.OS !== 'ios' && < StatusBarAndroid />}
          </DBProvider>
        </Provider >
      </SafeAreaProvider >
    );
  }
}
