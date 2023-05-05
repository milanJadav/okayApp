import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screen
// import Home from './../Scenes/Home/Home';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="CurrentIpo" component={CurrentIpoTab} />
      <Stack.Screen name="LiveSubscription" component={SubscriptionTabs} />
      <Stack.Screen name="IpoDetails" component={IpoDetails} />
      <Stack.Screen name="ApplyBids" component={ApplyBids} />
      <Stack.Screen name="NcdScreen" component={NcdScreen} />
      <Stack.Screen name="PastIpo" component={PastIpoTab} />
      <Stack.Screen name="BuyBack" component={BuyBackTab} />
      <Stack.Screen name="RightsIssue" component={RightsIssue} />
      <Stack.Screen name="OFS" component={OFS} />
      <Stack.Screen name="HniCalculator" component={HniCalculator} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Calendar" component={Calendar} /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
