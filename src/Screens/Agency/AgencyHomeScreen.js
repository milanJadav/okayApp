import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {safeAreaStyle} from '../../Common/CommonStyles';
import LocationNavBar from '../Components/LocationNavBar';
import HightBox from '../Components/HightBox';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import FastImage from 'react-native-fast-image';
import {IMAGES} from '../../Common/Constants/images';

const AgencyHomeScreen = () => {
  const [customerSelected, setCustomerSelected] = useState(false);
  const [architectSelected, setArchitectSelected] = useState(true);

  const renderButtonRow = () => {
    const onArchitectPress = () => {
      setArchitectSelected(true);
      setCustomerSelected(false);
    };
    const onCustomerPress = () => {
      setArchitectSelected(false);
      setCustomerSelected(true);
    };
    return (
      <View style={styles.btnRow}>
        <TouchableOpacity
          onPress={() => onArchitectPress()}
          style={[
            styles.filledBtn,
            {
              backgroundColor: architectSelected
                ? COLORS.pr_blue
                : COLORS.white,
            },
          ]}>
          <Text
            style={[
              styles.btnFont,
              {
                color: architectSelected ? COLORS.white : COLORS.textColor,
                fontFamily: architectSelected
                  ? FONTS.OUTFIT_MEDIUM
                  : FONTS.OUTFIT_REGULAR,
              },
            ]}>
            Architect
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onCustomerPress()}
          style={[
            styles.filledBtn,
            {
              backgroundColor: customerSelected ? COLORS.pr_blue : COLORS.white,
            },
          ]}>
          <Text
            style={[
              styles.btnFont,
              {
                color: customerSelected ? COLORS.white : COLORS.textColor,
                fontFamily: customerSelected
                  ? FONTS.OUTFIT_MEDIUM
                  : FONTS.OUTFIT_REGULAR,
              },
            ]}>
            Customer
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyContainer = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FastImage
          source={IMAGES.MESSAGE_BOX}
          style={{height: '35%', width: '70%'}}
          resizeMode="contain"
        />

        <Text style={styles.headerText}>You don't have any inquiry yet!!</Text>
        <Text style={styles.subHeaderText}>
          We’ll notify you once any inquiry got by customer or architect.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <LocationNavBar />
        <HightBox height={25} />
        {renderButtonRow()}
        {renderEmptyContainer()}
      </View>
    </SafeAreaView>
  );
};

export default AgencyHomeScreen;

const styles = StyleSheet.create({
  btnRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    padding: 4,
    borderRadius: 30,
  },
  filledBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.pr_blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    // paddingHorizontal: 15,
    width: '50%',
    paddingVertical: 10,
  },
  btnFont: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 17,
  },
  headerText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.textColor,
    fontSize: 22,
    textAlign: 'center',
    // lineHeight: 17,
  },
  subHeaderText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.textColor64,
    fontSize: 14,
    textAlign: 'center',
    // lineHeight: 17,
  },
});
