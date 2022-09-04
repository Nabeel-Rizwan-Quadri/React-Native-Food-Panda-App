import * as React from 'react';
import MainNavigator from './src/config/navigation';

import { Provider } from 'react-redux'
import { store } from './src/store'

import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  )
}

/*
RN CLI vs Expo

RN CLI:
Pros:
1. Development is fast 
2. We can link our Native code with RN CLI
3. You are open to use vast collection of libraries contributed 
by developers
4. Build size (apk/ipa) is usually less.

Cons:
1. We need SDK configuration (Android Studio/Xcode)
2. More build errors
3. External hardware related libraries need linking
that's why difficult to integrate
4. You will need MAC OS for iOS development + production

EXPO: 
Pros:
1. We don't need any SDK configuration (Android Studio/Xcode)
2. Less build errors
3. You don't need linking for Hardware libraries
4. You will not need MAC Os for iOS development but for production.

Cons:
1. Development is slow
2. We can't link Native code with Expo.
3. You can only use EXPO libraries for Hardware related work, where
as you can use any library from outside expo for UI purpose.
4. Build size is usually big.


Jugaar for iOS development:
1. Hackintosh
2. Vmware (MAC OS ki iso (image file))
3. Client provides you access of his MAC
*/

