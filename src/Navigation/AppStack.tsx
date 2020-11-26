import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Users from '../Screens/Users/Users';
import UserDetails from '../Screens/UserDetails/UserDetails';
import Credits from '../Screens/Credits/Credits';

// Navigation stack of the entire app, here are defined all the different screens which are accessible throughout the app

const AppStack = () => {
  const App = createNativeStackNavigator();
  return (
    <App.Navigator screenOptions={{headerShown: false}}>
      <App.Screen name="Users" component={Users} />
      <App.Screen name="UserDetails" component={UserDetails} />
      <App.Screen name="Credits" component={Credits} />
    </App.Navigator>
  );
};

export default AppStack;
