import { useState, useEffect } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { onAuthStateChanged } from 'firebase/auth'

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Logout from '../screens/Logout'
import Details from '../screens/Details'
import Menu from '../screens/Menu';
import Cart from '../screens/Cart'
import DeliveryInfo from '../screens/CheckOut/DeliveryInfo';
import Payment from '../screens/CheckOut/Payment';
import PlaceOrder from '../screens/CheckOut/PlaceOrder';

import { auth } from './firebase';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  const [user, setUser] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });
  }, [])

  return <NavigationContainer>
    {
      user ? <MainDrawer />
        : <AuthStack />
    }
  </NavigationContainer>
}

function MainDrawer() {
  return (
    <Drawer.Navigator options={{ title: "Food Panda" }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#E75480',
        },
      }}
    >
      <Drawer.Screen name="dashboardStack" component={DashboardStack}
        options={{
          title: 'Food Panda',
          headerTintColor: '#E75480'
        }}
      />
      <Drawer.Screen name="cart" component={CartStack}
        options={{
          title: 'Cart',
          headerTintColor: '#E75480'
        }}
      />
      <Drawer.Screen name="profile" component={Profile}
        options={{
          title: 'Your Profile',
          headerTintColor: '#E75480'
        }}
      />
      <Drawer.Screen name="logout" component={Logout}
        options={{
          title: 'Logout',
          headerTintColor: '#E75480'
        }}
      />
    </Drawer.Navigator>
  );
}

function DashboardStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="home" component={Home} options={{ title: ' ' }} />

      <Stack.Screen name="menu" component={Menu}
        options={({ route }) => ({ id: route.params.id })}
      />
      <Stack.Screen name="details" component={Details}
        options={({ route }) => ({
          selectedDish: route.params.selectedDish,
          restInfo: route.params.restInfo
        })} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator initialRouteName='cart'>
      <Stack.Screen name="cart" component={Cart} options={{ title: ' ' }} />
      <Stack.Screen name="deliveryInfo" component={DeliveryInfo} options={{ title: 'Delivery Info' }} />
      <Stack.Screen name="payment" component={Payment} options={{ title: 'Payment' }} />
      <Stack.Screen name="placeOrder" component={PlaceOrder} options={{ title: 'Place Order' }} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#E75480',
          flex: 1,
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={Login}
        options={{
          title: 'Login',
          headerTintColor: '#E75480'
        }}
      />
      <Stack.Screen name="signup" component={Signup}
        options={{
          title: 'Signup',
          headerTintColor: '#E75480'
        }}
      />
    </Stack.Navigator>
  );
}
