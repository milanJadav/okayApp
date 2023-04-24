import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';

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
import {useDispatch} from 'react-redux';
import {saveArchitectProject} from '../../redux/auth/authActions';
import {getFileName} from '../../Utils/Utils';

const CreateProject = props => {
  const {showSkipBtn} = props.route.params || {};
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onCreate = () => {
    if (!projectName) {
      alert('Please Add Project Name!');
    } else if (!clientName) {
      alert('Please Add Client Name!');
    } else if (!address) {
      alert('Please Add Address!');
    } else if (images.length == 0) {
      alert('Please Select atleast 1 Image!');
    } else {
      const photos = images.map(item => {
        let filename = getFileName(item?.path);
        return {
          filename: filename,
          data: item.data,
        };
      });

      const payload = {
        name: projectName,
        client_name: clientName,
        address: address,
        photos,
      };
      // console.log(payload);
      setLoading(true);
      dispatch(saveArchitectProject({payload, onSuccess, onFailure}));
    }
  };

  const onSuccess = () => {
    setLoading(false);
    props.navigation.replace('ArchitectBottomTab');
  };

  const onFailure = () => {
    setLoading(false);
  };

  const onRemoveImage = imgName => {
    const newArr = images.filter(item => item.path !== imgName);
    setImages(newArr);
  };

  const onUploadPhoto = () => {
    const OsVer = Platform.constants['Release'];

    if (images.length == 4) return;

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
              // …
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
      maxFiles: 4 - images.length,
      multiple: true,
      includeBase64: true,
      mediaType: 'photo',
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
                  <View key={img.filename}>
                    <ImageBackground
                      key={img.filename}
                      source={{uri: `data:${img.mime};base64,${img.data}`}}
                      style={styles.imageStyle}
                      imageStyle={{borderRadius: 12}}
                      resizeMode={'cover'}>
                      <TouchableOpacity onPress={() => onRemoveImage(img.path)}>
                        <FastImage
                          source={IMAGES.IC_CROSS}
                          style={{height: 16, width: 16}}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
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
              value={projectName}
              onChangeText={text => setProjectName(text)}
              mainViewStyle={{
                marginTop: 5,
              }}
            />
            <HightBox height={10} />
            <Text style={styles.subTitleText}>Client name*</Text>
            <ITextField
              value={clientName}
              onChangeText={text => setClientName(text)}
              mainViewStyle={{
                marginTop: 5,
              }}
            />
            <HightBox height={10} />
            <Text style={styles.subTitleText}>Address*</Text>
            <ITextField
              value={address}
              onChangeText={text => setAddress(text)}
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
          <View style={{marginTop: 10}}>
            <IButton
              title={'Create a project'}
              onPress={onCreate}
              loading={loading}
            />
          </View>
          <HightBox height={10} />
          {showSkipBtn && (
            <Text
              style={[styles.uploadText, {textAlign: 'center', fontSize: 16}]}
              onPress={() => props.navigation.replace('ArchitectBottomTab')}>
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
