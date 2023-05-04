import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FONTS} from '../Common/Constants/fonts';
import {COLORS} from '../Common/Constants/colors';
import FastImage from 'react-native-fast-image';
import Dashboard from '../Screens/Architect/Dashboard';
import Profile from '../Screens/Architect/Profile';
import {IMAGES} from '../Common/Constants/images';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PurchasePlan from '../Screens/Agency/PurchasePlan';
import Documents from '../Screens/Agency/Documents';
import UploadPanDoc from '../Screens/Agency/UploadPanDoc';
import AddProjectDoc from '../Screens/Agency/AddProjectDoc';
import AgencyHomeScreen from '../Screens/Agency/AgencyHomeScreen';
import ClientDetails from '../Screens/Agency/ClientDetails';
import EditProfile from '../Screens/Architect/EditProfile';
import AccountDelete from '../Screens/Architect/AccountDelete';
import AgencyProfile from '../Screens/Agency/AgencyProfile';
import PastArchitects from '../Screens/Agency/PastArchitects';
import PastCustomers from '../Screens/Agency/PastCustomers';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabButton = ({img, color, text, focused}) => {
  const focusedStyle = {
    borderTopColor: COLORS.pr_blue,
    borderTopWidth: 3,
  };
  return (
    <View style={[styles.image_titleContainer, focused ? focusedStyle : {}]}>
      <FastImage
        source={img}
        style={{height: 24, width: 24, marginBottom: 3}}
        resizeMode="contain"
        tintColor={color}
      />
      <Text
        style={{
          ...styles.textStyle,
          color: focused ? COLORS.pr_blue : COLORS.bottomTabText,
          fontFamily: focused ? FONTS.OUTFIT_MEDIUM : FONTS.OUTFIT_REGULAR,
        }}>
        {text}
      </Text>
    </View>
  );
};

const AgencyBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.pr_blue,
        tabBarStyle: {
          // position: 'absolute',
          height: '8%',
          backgroundColor: COLORS.white,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="AgencyHomeScreen"
        component={AgencyHomeScreen}
        initialParams={{rightNavButtons: []}}
        options={{
          tabBarIcon: ({color, focused}) => (
            <TabButton
              img={IMAGES.IC_HOME}
              focused={focused}
              color={color}
              text={'Home'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AgencyProfile"
        component={AgencyProfile}
        options={{
          tabBarIcon: ({color, focused}) => (
            <TabButton
              img={IMAGES.IC_USER}
              focused={focused}
              color={color}
              text={'Profile'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AgencyStack = props => {
  const {initialRoute} = props.route.params || {};
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRoute ? initialRoute : 'ArchitectProjectType'}>
      <Stack.Screen name="PurchasePlan" component={PurchasePlan} />
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen name="UploadPanDoc" component={UploadPanDoc} />
      <Stack.Screen name="AddProjectDoc" component={AddProjectDoc} />
      <Stack.Screen name="AgencyBottomTab" component={AgencyBottomTab} />
      <Stack.Screen name="ClientDetails" component={ClientDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AccountDelete" component={AccountDelete} />
      <Stack.Screen name="PastArchitects" component={PastArchitects} />
      <Stack.Screen name="PastCustomers" component={PastCustomers} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  image_titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    paddingTop: Platform.OS == 'android' ? 0 : '12%',
    // paddingBottom: Platform.OS == 'android' ? 15 : 0,
  },

  textStyle: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.bottomTabText,
    fontSize: 12,
  },
});
export default AgencyStack;
