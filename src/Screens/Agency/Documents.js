import React from 'react';
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
import {FONTS} from '../../Common/Constants/fonts';
import {COLORS} from '../../Common/Constants/colors';
import FastImage from 'react-native-fast-image';
import {IMAGES} from '../../Common/Constants/images';
import IButton from '../Components/IButton';

const Documents = props => {
  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <LocationNavBar />
        <HightBox height={25} />

        <Text style={styles.titleText}>
          Hey there, we need some document for verification
        </Text>
        <HightBox height={7} />
        <Text style={styles.subTitleText}>Please upload below documents</Text>
        <HightBox height={25} />
        <TouchableOpacity
          style={styles.btnRow}
          onPress={() => props.navigation.navigate('UploadPanDoc')}>
          <FastImage
            source={IMAGES.IC_PLUS_FILES}
            style={{height: 24, width: 24, marginRight: 10}}
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={styles.btnTitle}>Upload documents</Text>
          </View>
          <FastImage
            source={IMAGES.IC_ARROW_DOWN}
            style={{height: 24, width: 24, transform: [{rotate: '-90deg'}]}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <HightBox height={15} />
        <TouchableOpacity
          style={styles.btnRow}
          onPress={() => props.navigation.navigate('AddProjectDoc')}>
          <FastImage
            source={IMAGES.IC_ADDPROJECTS}
            style={{height: 24, width: 24, marginRight: 10}}
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={styles.btnTitle}>Add projects</Text>
          </View>
          <FastImage
            source={IMAGES.IC_ARROW_DOWN}
            style={{height: 24, width: 24, transform: [{rotate: '-90deg'}]}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <HightBox height={15} />
        <TouchableOpacity style={styles.uploadBtn} onPress={() => {}}>
          <FastImage
            source={IMAGES.IC_UPLOAD}
            style={{height: 20, width: 20, marginRight: 5}}
            resizeMode="contain"
            tintColor={COLORS.pr_blue}
          />
          <Text style={styles.uploadText}>Upload price list</Text>
        </TouchableOpacity>
        <HightBox height={10} />
        <Text style={styles.notes}>File must be in PDF format</Text>
        <HightBox height={50} />
        <IButton
          title={'Save'}
          onPress={() => props.navigation.navigate('AgencyBottomTab')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Documents;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.textColor,
    textAlign: 'center',
  },
  subTitleText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: COLORS.textColor64,
  },
  btnRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnTitle: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 16,
    color: COLORS.textColor64,
  },
  uploadBtn: {
    paddingVertical: 16,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 100, 229, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: COLORS.pr_blue,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  uploadText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.pr_blue,
    fontSize: 14,
  },
  notes: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 12,
    lineHeight: 15,
    color: 'rgba(0, 0, 0, 0.44)',
  },
});
