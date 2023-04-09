import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import ArchitectProjectType from '../Screens/Architect/ArchitectProjectType';
import CreateProject from '../Screens/Architect/CreateProject';

const Stack = createNativeStackNavigator();

const ArchitectStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ArchitectProjectType"
        component={ArchitectProjectType}
      />
      <Stack.Screen name="CreateProject" component={CreateProject} />
    </Stack.Navigator>
  );
};

export default ArchitectStack;
