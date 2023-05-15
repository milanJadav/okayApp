import React, {useState} from 'react';
import {ImageBackground, Platform, SafeAreaView} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {safeAreaStyle} from '../../Common/CommonStyles';
import INavBar from '../Components/INavBar';
import HightBox from '../Components/HightBox';
import {IMAGES} from '../../Common/Constants/images';
import {windowHeight, windowWidth} from '../../Utils/Dimentions';
import FastImage from 'react-native-fast-image';
import ICameraButton from '../Components/ICameraButton';
import {COLORS} from '../../Common/Constants/colors';
import ITextField from '../Components/ITextField';
import {FONTS} from '../../Common/Constants/fonts';
import IButton from '../Components/IButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {saveUserDetails} from '../../redux/profile/profileActions';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getFileName} from '../../Utils/Utils';

const EditProfile = props => {
  const {userProfileData} = props.route?.params || {};
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(userProfileData?.full_name || '');
  const [email, setEmail] = useState(userProfileData?.email || '');
  const [mobileNum, setMobileNum] = useState(userProfileData?.mobile || '');

  const dispatch = useDispatch();

  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };
  const onSaveChanges = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!name) {
      alert('Please Add Name!');
    } else if (!email) {
      alert('Please Add Email!');
    } else if (!regex.test(email)) {
      alert('Please Add Valid Email!');
    } else if (!mobileNum) {
      alert('Please Add Mobile Number!');
    } else {
      setLoading(true);
      const payload = {
        full_name: name || '',
        email: email || '',
        mobile: mobileNum || '',
        profile: {
          filename: getFileName(profilePic?.path) || '',
          data: profilePic.data,
        },
      };
      dispatch(saveUserDetails({payload, onSuccess, onFailure}));
    }
  };

  const onSuccess = () => {
    setLoading(false);
    onBackPress();
  };

  const onFailure = () => {
    setLoading(false);
  };

  const onUploadPhoto = () => {
    const OsVer = Platform.constants['Release'];

    if (Platform.OS == 'android' && OsVer <= 12) {
      check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
              if (result == RESULTS.GRANTED) {
                openImagePicker();
              }
            });
            break;

          case RESULTS.GRANTED:
            openImagePicker();
            break;
        }
      });
      return;
    } else {
      openImagePicker();
    }
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      setProfilePic(image);
    });
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20}}>
        <INavBar title="Edit profile" onBackPress={onBackPress} />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          scrollEnabled={true}
          contentContainerStyle={{
            justifyContent: 'space-between',
          }}
          showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 20, flex: 1}}>
            <HightBox height={10} />
            <ImageBackground
              source={IMAGES.IC_PROFILE_DOTS}
              resizeMode="contain"
              style={styles.imgBackground}>
              <View style={{borderRadius: 50}}>
                <FastImage
                  source={{
                    uri: profilePic
                      ? `data:${profilePic.mime};base64,${profilePic.data}`
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png',
                  }}
                  style={styles.img}
                  resizeMode="contain"
                />
                <View style={styles.cameraBtn}>
                  <ICameraButton onPress={() => onUploadPhoto('profile')} />
                </View>
              </View>
            </ImageBackground>
            {/* <HightBox height={22} /> */}
            <Text style={styles.subTitleText}>Full name</Text>
            <ITextField
              value={name}
              onChangeText={text => setName(text)}
              mainViewStyle={{
                marginTop: 5,
              }}
            />
            <HightBox height={24} />
            <Text style={styles.subTitleText}>Email address</Text>
            <ITextField
              value={email}
              onChangeText={text => setEmail(text)}
              mainViewStyle={{
                marginTop: 5,
              }}
              keyboardType={'email-address'}
            />
            <HightBox height={24} />
            <Text style={styles.subTitleText}>Mobile number</Text>
            <ITextField
              value={mobileNum}
              onChangeText={text => setMobileNum(text)}
              mainViewStyle={{
                marginTop: 5,
              }}
              keyboardType={'numeric'}
              maxLength={13}
            />
            <HightBox height={25} />
          </View>
          <View style={{height: 30}} />
          <View style={styles.bottomContainer}>
            <View style={{}}>
              <IButton
                title={'Save changes'}
                onPress={onSaveChanges}
                loading={loading}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  imgBackground: {
    height: windowHeight / 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
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
});
