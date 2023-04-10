import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {safeAreaStyle} from '../../Common/CommonStyles';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import {IMAGES} from '../../Common/Constants/images';
import {windowHeight} from '../../Utils/Dimentions';
import HightBox from '../Components/HightBox';
import IBackButton from '../Components/IBackButton';
import IButton from '../Components/IButton';
import ITextField from '../Components/ITextField';

const CreateProject = props => {
  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onCreate = () => {
    props.navigation.navigate('ArchitectBottomTab');
  };
  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20}}>
        <IBackButton onPress={onBackPress} />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 20, flex: 1}}>
            <HightBox height={30} />
            <Text style={styles.titleText}>Let’s create your project</Text>
            <Text style={[styles.subTitleText, {textAlign: 'center'}]}>
              We’ll need some information regarding your project, please give us
              details below
            </Text>
            <HightBox height={22} />
            <Text style={styles.subTitleText}>Project name*</Text>
            <ITextField
              mainViewStyle={{
                marginTop: 5,
              }}
            />
            <HightBox height={10} />
            <Text style={styles.subTitleText}>Client name*</Text>
            <ITextField
              mainViewStyle={{
                marginTop: 5,
              }}
            />
            <HightBox height={10} />
            <Text style={styles.subTitleText}>Address*</Text>
            <ITextField
              multiline={true}
              mainViewStyle={{
                marginTop: 5,
                height: 80,
              }}
            />
            <HightBox height={25} />
            <TouchableOpacity style={styles.uploadBtn}>
              <FastImage
                source={IMAGES.IC_PLUS}
                style={{height: 20, width: 20, marginRight: 5}}
                resizeMode="contain"
              />
              <Text style={styles.uploadText}>Upload photo</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.bottomContainer}>
          <View style={{marginTop: 30}}>
            <IButton title={'Create a project'} onPress={onCreate} />
          </View>
          <HightBox height={10} />
          <Text
            style={[styles.uploadText, {textAlign: 'center', fontSize: 16}]}>
            Skip for now
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateProject;

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
    color: COLORS.textColor64,
    marginTop: 8,
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
});
