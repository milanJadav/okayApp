import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {safeAreaStyle} from '../../Common/CommonStyles';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import {IMAGES} from '../../Common/Constants/images';
import {agencies} from '../../Utils/Data';
import {windowHeight, windowWidth} from '../../Utils/Dimentions';
import AgencyTypeCard from '../Components/AgencyTypeCard';
import HightBox from '../Components/HightBox';
import IBackButton from '../Components/IBackButton';
import ProgressBar from '../Components/ProgressBar';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProjectDetail} from '../../redux/dashboard/dashboardActions';
import {openLinks} from '../../Utils/Utils';

const ClientDetails = props => {
  const {data} = props.route.params || {};

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const projectDetail = useSelector(
    state => state.dashboard?.projectDetail || {},
  );

  //   useEffect(() => {
  //     setLoading(true);
  //     dispatch(getUserProjectDetail({projectId, onSuccess, onFailure}));
  //   }, []);

  const onSuccess = () => {
    setLoading(false);
  };

  const onFailure = () => {
    setLoading(false);
  };

  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  //RENDER METHODS
  const renderLoading = () => (
    <ActivityIndicator size={'small'} color={COLORS.black} />
  );

  return (
    <SafeAreaView edges={['bottom']} style={safeAreaStyle}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {renderLoading()}
        </View>
      ) : (
        <View style={{flex: 1}}>
          {/* <View
            style={{
              flex: 0.5,
              backgroundColor: 'red',
            }}> */}
          <ImageBackground
            source={require('../../assets/temp/agencyDetail.png')}
            style={styles.topImg}
            imageStyle={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
            resizeMode="cover">
            <IBackButton onPress={onBackPress} />
          </ImageBackground>
          {/* </View> */}
          {/* <HightBox height={25} /> */}
          <View style={{flex: 0.02}} />
          <View
            style={{
              paddingHorizontal: 20,
              flex: 0.47,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.agencyName} numberOfLines={1}>
                {data?.full_name}
              </Text>

              <View style={styles.border} />
              <Text
                style={[styles.agencyName, {fontSize: 18}]}
                numberOfLines={1}>
                Location
              </Text>
              <HightBox height={15} />
              <View style={styles.ratingRow}>
                <View style={styles.locationRound}>
                  <FastImage
                    source={IMAGES.IC_LOCATION}
                    style={{height: 24, width: 24}}
                    resizeMode="contain"
                    tintColor={COLORS.orange}
                  />
                </View>
                <View style={{width: '70%', marginLeft: 10}}>
                  <Text style={styles.address}>{data?.address}</Text>
                </View>
              </View>
            </View>
            <View style={styles.agencyRow}>
              <TouchableOpacity style={[styles.filledBtn]}>
                <FastImage
                  source={IMAGES.IC_CALL}
                  style={{height: 19, width: 19, marginRight: 10}}
                  resizeMode="contain"
                  tintColor={COLORS.white}
                />
                <Text style={styles.btnText}>{'Call'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filledBtn, {backgroundColor: COLORS.orange}]}
                onPress={() =>
                  openLinks(`whatsapp://send?phone=91${data?.mobile}`)
                }>
                <FastImage
                  source={IMAGES.IC_MESSAGE}
                  style={{height: 19, width: 19, marginRight: 5}}
                  resizeMode="contain"
                  tintColor={COLORS.white}
                />
                <Text style={styles.btnText}>{'Chat'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ClientDetails;

const styles = StyleSheet.create({
  topImg: {
    flex: 0.47,
    // height: '100%',
    // width: '100%',
    paddingHorizontal: 20,
    paddingTop: Platform.OS == 'ios' ? 50 : 20,
  },
  agencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agencyName: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: 22,
    lineHeight: 26,
    color: COLORS.textColor,
  },
  clientName: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.grayText,
    fontSize: 14,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  progressText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.pr_blue,
    fontSize: 14,
    lineHeight: 26,
  },

  border: {
    borderColor: 'rgba(16, 22, 35, 0.12)',
    borderWidth: 1,
    marginVertical: 15,
  },
  locationRound: {
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  address: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.textColor,
    fontSize: 16,
    lineHeight: 22,
  },
  filledBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.pr_blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
    width: '47%',
    paddingVertical: 13,
  },
  btnText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 22,
  },
});
