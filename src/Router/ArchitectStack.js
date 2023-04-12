import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Screens
import ArchitectProjectType from '../Screens/Architect/ArchitectProjectType';
import CreateProject from '../Screens/Architect/CreateProject';
import {COLORS} from '../Common/Constants/colors';
import Dashboard from '../Screens/Architect/Dashboard';
import Projects from '../Screens/Architect/Projects';
import Profile from '../Screens/Architect/Profile';
import FastImage from 'react-native-fast-image';
import {IMAGES} from '../Common/Constants/images';
import {StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../Common/Constants/fonts';
import ArchitectSelectCategory from '../Screens/Architect/ArchitectSelectCategory';
import AgencyList from '../Screens/Architect/AgencyList';
import AgencyDetail from '../Screens/Agency/AgencyDetail';
import SelectProjects from '../Screens/Architect/SelectProjects';

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

const ArchitectBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.pr_blue,
        tabBarStyle: {
          // position: 'absolute',
          // height: 100,
          backgroundColor: COLORS.white,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
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
        name="Projects"
        component={Projects}
        options={{
          tabBarIcon: ({color, focused}) => (
            <TabButton
              img={IMAGES.IC_FILE}
              focused={focused}
              color={color}
              text={'Projects'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
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

const ArchitectStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ArchitectProjectType"
        component={ArchitectProjectType}
      />
      <Stack.Screen name="CreateProject" component={CreateProject} />
      <Stack.Screen name="ArchitectBottomTab" component={ArchitectBottomTab} />
      <Stack.Screen
        name="ArchitectSelectCategory"
        component={ArchitectSelectCategory}
      />
      <Stack.Screen name="AgencyList" component={AgencyList} />
      <Stack.Screen name="AgencyDetail" component={AgencyDetail} />
      <Stack.Screen name="SelectProjects" component={SelectProjects} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  image_titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 15,
  },

  textStyle: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.bottomTabText,
    fontSize: 12,
  },
});

export default ArchitectStack;
