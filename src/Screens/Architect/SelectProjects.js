import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {safeAreaStyle} from '../../Common/CommonStyles';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import {IMAGES} from '../../Common/Constants/images';
import HightBox from '../Components/HightBox';
import IBackButton from '../Components/IBackButton';
import IButton from '../Components/IButton';

const SelectProjects = props => {
  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onContinue = () => {
    props.navigation.navigate('CreateProject');
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{paddingHorizontal: 20}}>
          <IBackButton onPress={onBackPress} />
          <HightBox height={30} />
          <Text style={styles.titleText}>
            For which projects you are selecting this agency ?
          </Text>

          <HightBox height={30} />

          <TouchableOpacity style={styles.dropDowncontainer}>
            <Text style={styles.dropText}>Select projects</Text>
            <FastImage
              source={IMAGES.IC_ARROW_DOWN}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* project search */}
          <View style={styles.projectSearchContainer}>
            <View style={styles.searchBoxContainer}>
              <FastImage
                source={IMAGES.IC_SEARCH}
                style={{height: 16, width: 16}}
                resizeMode="contain"
              />

              <TextInput
                style={styles.inputStyle}
                placeholder={'Search projects'}
                placeholderTextColor={COLORS.textColor44}
              />
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={{marginTop: 30}}>
            <IButton title={'Continue'} onPress={onContinue} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectProjects;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.textColor,
    textAlign: 'center',
  },
  bottomContainer: {paddingHorizontal: 20, marginBottom: 30},
  dropDowncontainer: {
    height: 48,
    borderColor: COLORS.textColor,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  dropText: {
    fontFamily: FONTS.OUTFIT_LIGHT,
    color: COLORS.textColor44,
    fontSize: 14,
  },
  projectSearchContainer: {
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    padding: 16,
    marginTop: 10,
    borderRadius: 12,
  },
  searchBoxContainer: {
    width: '100%',
    borderColor: COLORS.textColor64,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: FONTS.OUTFIT_LIGHT,
    color: COLORS.textColor,
  },
});
