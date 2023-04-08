import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import BottomNavigationStack from './BottomNavigationStack';
//import EditProfile from '../Scenes/Profile/EditProfile';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName="BottomTab"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="BottomTab" component={BottomNavigationStack} /> */}
      {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
      {/* <Stack.Screen name="ResetPinOtp" component={ResetPinOtp} /> */}
    </Stack.Navigator>
  );
};

export default AppStack;
