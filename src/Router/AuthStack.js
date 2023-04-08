import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../Screens/Login/Onboarding';

//Screens
// import Login from './../Scenes/Login/Login';

const AuthStack = createNativeStackNavigator();

const AuthStacks = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Onboarding">
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
    </AuthStack.Navigator>
  );
};

export default AuthStacks;
