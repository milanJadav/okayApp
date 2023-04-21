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
import ImagePicker from 'react-native-image-crop-picker';
import {safeAreaStyle} from '../../Common/CommonStyles';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import {IMAGES} from '../../Common/Constants/images';
import {windowHeight, windowWidth} from '../../Utils/Dimentions';
import HightBox from '../Components/HightBox';
import IBackButton from '../Components/IBackButton';
import IButton from '../Components/IButton';
import ITextField from '../Components/ITextField';
import {ImageBackground} from 'react-native';

const CreateProject = props => {
  const {showSkipBtn} = props.route.params || {};

  const [images, setImages] = useState([]);
  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onCreate = () => {
    props.navigation.navigate('ArchitectBottomTab');
  };

  const onRemoveImage = imgName => {
    const newArr = images.filter(item => item.creationDate !== imgName);
    setImages(newArr);
  };

  const onUploadPhoto = () => {
    if (images.length == 4) return;

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      maxFiles: 4 - images.length,
      multiple: true,
    }).then(image => {
      setImages([...images, ...image]);
    });
  };

  const renderImageRow = () => {
    return (
      <View style={styles.imgRow}>
        {images.length > 0
          ? images.map(img => {
              return (
                <>
                  <ImageBackground
                    key={img.filename}
                    source={{uri: img.sourceURL}}
                    style={styles.imageStyle}
                    imageStyle={{borderRadius: 12}}
                    resizeMode={'cover'}>
                    <TouchableOpacity
                      onPress={() => onRemoveImage(img.creationDate)}>
                      <FastImage
                        source={IMAGES.IC_CROSS}
                        style={{height: 16, width: 16}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </>
              );
            })
          : null}
      </View>
    );
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
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => onUploadPhoto()}>
              <FastImage
                source={IMAGES.IC_PLUS}
                style={{height: 20, width: 20, marginRight: 5}}
                resizeMode="contain"
              />
              <Text style={styles.uploadText}>Upload photo</Text>
            </TouchableOpacity>
            {renderImageRow()}
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.bottomContainer}>
          <View style={{marginTop: 30}}>
            <IButton title={'Create a project'} onPress={onCreate} />
          </View>
          <HightBox height={10} />
          {showSkipBtn && (
            <Text
              style={[styles.uploadText, {textAlign: 'center', fontSize: 16}]}>
              Skip for now
            </Text>
          )}
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
  imgRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  imageStyle: {
    height: windowHeight / 6,
    width: windowWidth / 3.5,
    marginVertical: 10,
    alignItems: 'flex-end',
    padding: 7,
  },
});
