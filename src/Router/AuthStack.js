import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../Screens/Login/Onboarding';
import Login from '../Screens/Login/Login';
import OTP_Verify from '../Screens/Login/OTP_Verify';
import RoleSelection from '../Screens/Login/RoleSelection';

//Screens
// import Login from './../Scenes/Login/Login';

const AuthStack = createNativeStackNavigator();

const AuthStacks = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Onboarding">
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="OTP_Verify" component={OTP_Verify} />
      <AuthStack.Screen name="RoleSelection" component={RoleSelection} />
    </AuthStack.Navigator>
  );
};

export default AuthStacks;
