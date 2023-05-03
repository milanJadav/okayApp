import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';

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
import {useDispatch, useSelector} from 'react-redux';
import {
  getDashboardCategory,
  getSubCategory,
} from '../../redux/dashboard/dashboardActions';
import {getFileName} from '../../Utils/Utils';
import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';
import {setAgencyDocData} from '../../redux/agency/agencySlice';
import {saveAgencyDocuments} from '../../redux/agency/agencyActions';

const UploadPanDoc = props => {
  const agencyDocData = useSelector(state => state.agency?.agencyDocData || {});
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [profilePic, setProfilePic] = useState(agencyDocData?.profilePic);
  const [panPic, setPanPic] = useState(agencyDocData?.panPic);
  const [agencyName, setAgencyName] = useState(agencyDocData?.agencyName);
  const [gstNum, setGstNum] = useState(agencyDocData?.gstNum);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const categoryDataRedux = useSelector(
    state => state.dashboard?.categoryData || [],
  );

  const subCategoryData = useSelector(
    state => state.dashboard?.subCategoryData || [],
  );

  useEffect(() => {
    dispatch(getDashboardCategory({}));
  }, []);

  const onSuccess = () => {
    setLoading(false);
  };

  const onSuccessAgencySave = () => {
    setLoading(false);
    onBackPress();
  };

  const onFailure = () => {
    setLoading(false);
  };

  const onChangeCategory = data => {
    setCategoryId(data.id);
    setSubCategoryId(null);
    dispatch(getSubCategory({categoryId: data.id}));
  };

  const onChangeSubCategory = data => {
    setSubCategoryId(data.id);
  };

  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onUploadPhoto = type => {
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
              // …
              if (result == RESULTS.GRANTED) {
                openImagePicker(type);
              }
            });
            break;

          case RESULTS.GRANTED:
            openImagePicker(type);
            break;
        }
      });
      return;
    } else {
      openImagePicker(type);
    }
  };

  const openImagePicker = type => {
    ImagePicker.openPicker({
      includeBase64: true,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      if (type == 'profile') {
        setProfilePic(image);
      } else if (type == 'pan') {
        setPanPic(image);
      }
    });
  };

  const onSubmitClick = () => {
    if (!agencyName) {
      alert('Please Add Agency Name!');
    } else if (profilePic == null) {
      alert('Please Select Profile Image!');
    } else if (!categoryId) {
      alert('Please Select Category!');
    } else if (!subCategoryId) {
      alert('Please Select Sub Category!');
    } else if (panPic == null) {
      alert('Please Select Pan Image!');
    } else if (!gstNum) {
      alert('Please Add GST Number!');
    } else {
      setLoading(true);
      const data = {
        categoryId,
        subCategoryId,
        profilePic,
        panPic,
        agencyName,
        gstNum,
      };
      dispatch(setAgencyDocData(data));

      localStorageHelper
        .getItemFromStorage(StorageKeys.USER_ID)
        .then(async userId => {
          const payload = {
            documentImage: {
              filename: getFileName(panPic?.path) || '',
              data: panPic.data,
            },
            gstNumber: gstNum,
            agencyName: agencyName,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            agencyImage: {
              filename: getFileName(profilePic?.path) || '',
              data: profilePic.data,
            },
            userId: userId,
            flag: '1',
          };
          dispatch(
            saveAgencyDocuments({
              payload,
              onSuccess: onSuccessAgencySave,
              onFailure,
            }),
          );
        });
    }
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
            <HightBox height={10} />
            <Text style={styles.subTitleText}>Upload agency profile</Text>
          </View>
          <HightBox height={30} />

          <Text style={styles.subTitleText}>Agency Name</Text>
          <ITextField
            value={agencyName}
            onChangeText={text => setAgencyName(text)}
            mainViewStyle={{
              marginTop: 5,
            }}
          />
          <HightBox height={20} />
          <Text style={styles.subTitleText}>Category</Text>
          <HightBox height={5} />
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.selectedTextStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={categoryDataRedux}
            // value={categoryName}
            maxHeight={200}
            labelField="category_name"
            valueField={'id'}
            placeholder={'Select Category'}
            onChangeText={item => {}}
            onChange={item => {
              onChangeCategory(item);
            }}
          />
          <HightBox height={20} />
          <Text style={styles.subTitleText}>Sub Category</Text>
          <HightBox height={5} />
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.selectedTextStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={subCategoryData}
            disable={categoryId == null}
            maxHeight={200}
            labelField="subcategory_name"
            valueField={'id'}
            placeholder={'Select Sub Category'}
            onChangeText={item => {}}
            onChange={item => {
              onChangeSubCategory(item);
            }}
          />
          <HightBox height={20} />
          <Text style={styles.subTitleText}>Upload your PAN card</Text>
          <HightBox height={10} />

          {panPic ? (
            <View style={styles.imgContainer}>
              <View style={styles.imgNameRow}>
                <Text
                  style={{...styles.subTitleText, width: '90%'}}
                  numberOfLines={1}>
                  {getFileName(panPic?.path) || ''}
                </Text>
                <TouchableOpacity onPress={() => setPanPic(null)}>
                  <FastImage
                    source={IMAGES.IC_CROSS}
                    style={{height: 16, width: 16}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <FastImage
                source={{
                  uri: panPic
                    ? `data:${panPic.mime};base64,${panPic.data}`
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png',
                }}
                style={{height: windowHeight / 4.5, width: '100%'}}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={() => onUploadPhoto('pan')}>
                <FastImage
                  source={IMAGES.IC_UPLOAD}
                  style={{height: 20, width: 20, marginRight: 5}}
                  resizeMode="contain"
                  tintColor={COLORS.pr_blue}
                />
                <Text style={styles.uploadText}>Upload document</Text>
              </TouchableOpacity>
              <HightBox height={7} />
              <Text style={styles.notes}>
                File must be in JPG or PNG format
              </Text>
            </View>
          )}
          <HightBox height={24} />
          <Text style={styles.subTitleText}>GST Number</Text>
          <ITextField
            value={gstNum}
            onChangeText={text => setGstNum(text)}
            mainViewStyle={{
              marginTop: 5,
            }}
            autoCapitalize={'characters'}
          />
          <HightBox height={30} />
        </View>

        <View style={styles.bottomContainer}>
          <View style={{}}>
            <IButton
              title={'Verify'}
              onPress={() => onSubmitClick()}
              loading={loading}
            />
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
  dropdown: {
    height: 48,
    borderColor: COLORS.textColor64,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.pr_background,
    paddingHorizontal: 10,
  },

  selectedTextStyle: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 16,
    color: COLORS.textColor,
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
  imgNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
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
