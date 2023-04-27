import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {safeAreaStyle} from '../../Common/CommonStyles';
import INavBar from '../Components/INavBar';
import {IMAGES} from '../../Common/Constants/images';
import IButton from '../Components/IButton';
import ICameraButton from '../Components/ICameraButton';
import {windowHeight} from '../../Utils/Dimentions';
import {FONTS} from '../../Common/Constants/fonts';
import {COLORS} from '../../Common/Constants/colors';
import HightBox from '../Components/HightBox';
import FastImage from 'react-native-fast-image';
import ITextField from '../Components/ITextField';

const UploadPanDoc = props => {
  const onBackPress = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20}}>
        <INavBar title="Upload document" onBackPress={onBackPress} />
      </View>

      <KeyboardAwareScrollView
        style={{flex: 1}}
        scrollEnabled={true}
        contentContainerStyle={{
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <HightBox height={25} />
          <View style={styles.imgBackground}>
            <View style={{borderRadius: 50}}>
              <FastImage
                source={require('../../assets/temp/profileTemp.png')}
                style={styles.img}
                resizeMode="contain"
              />
              <View style={styles.cameraBtn}>
                <ICameraButton />
              </View>
            </View>
            <HightBox height={10} />
            <Text style={styles.subTitleText}>Upload agency profile</Text>
          </View>
          <HightBox height={30} />

          <Text style={styles.subTitleText}>Upload your PAN card</Text>
          <HightBox height={10} />

          {/* <View>
            <TouchableOpacity style={styles.uploadBtn} onPress={() => {}}>
              <FastImage
                source={IMAGES.IC_UPLOAD}
                style={{height: 20, width: 20, marginRight: 5}}
                resizeMode="contain"
                tintColor={COLORS.pr_blue}
              />
              <Text style={styles.uploadText}>Upload document</Text>
            </TouchableOpacity>
            <HightBox height={7} />
            <Text style={styles.notes}>File must be in JPG or PNG format</Text>
          </View> */}
          <View style={styles.imgContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 4,
              }}>
              <Text style={styles.subTitleText}>Image89900789093.jpg</Text>
              <FastImage
                source={IMAGES.IC_CROSS}
                style={{height: 16, width: 16}}
                resizeMode="contain"
              />
            </View>
            <FastImage
              source={require('../../assets/temp/panTemp.png')}
              style={{height: windowHeight / 4.5, width: '100%'}}
              resizeMode="contain"
            />
          </View>
          <HightBox height={24} />
          <Text style={styles.subTitleText}>GST Number</Text>
          <ITextField
            // value={mobileNum}
            // onChangeText={text => setMobileNum(text)}
            mainViewStyle={{
              marginTop: 5,
            }}
            keyboardType={'numeric'}
            maxLength={10}
          />
          <HightBox height={30} />
        </View>

        <View style={styles.bottomContainer}>
          <View style={{}}>
            <IButton title={'Verify'} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UploadPanDoc;

const styles = StyleSheet.create({
  imgBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  imgContainer: {
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    padding: 5,
    borderRadius: 8,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 50,
  },
  subTitleText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textColor64,
  },
  bottomContainer: {paddingHorizontal: 20, marginBottom: 10},
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
