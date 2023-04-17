import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomerProjectType from '../Screens/Customer/CustomerProjectType';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomerStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="CustomerProjectType"
        component={CustomerProjectType}
      />
    </Stack.Navigator>
  );
};

export default CustomerStack;
