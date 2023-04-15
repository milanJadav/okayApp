import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {safeAreaStyle} from '../../Common/CommonStyles';
import INavBar from '../Components/INavBar';
import HightBox from '../Components/HightBox';
import {IMAGES} from '../../Common/Constants/images';
import FastImage from 'react-native-fast-image';
import {windowHeight} from '../../Utils/Dimentions';
import {FONTS} from '../../Common/Constants/fonts';
import {COLORS} from '../../Common/Constants/colors';

const AccountDelete = props => {
  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <INavBar title="Account" onBackPress={onBackPress} />
        <HightBox height={40} />
        <FastImage
          source={IMAGES.IC_DUSTBIN}
          style={{height: windowHeight / 5, width: '100%'}}
          resizeMode="contain"
        />
        <HightBox height={15} />
        <Text style={styles.titleText}>
          Are you sure you want to delete your account?
        </Text>
        <HightBox height={15} />
        <Text style={styles.subTitleText}>
          All of your data and information will be deleted
        </Text>
        <HightBox height={50} />
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Confirm delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountDelete;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: 22,
    lineHeight: 30,
    color: COLORS.textColor,
    textAlign: 'center',
  },
  subTitleText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 14,
    color: COLORS.textColor64,
    textAlign: 'center',
  },
  btnContainer: {
    width: '100%',
    backgroundColor: '#C12C2C',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btnText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 22,
  },
});
