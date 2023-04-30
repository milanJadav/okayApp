import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {safeAreaStyle} from '../../Common/CommonStyles';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import {IMAGES} from '../../Common/Constants/images';
import HightBox from '../Components/HightBox';
import IBackButton from '../Components/IBackButton';
import {useDispatch, useSelector} from 'react-redux';
import {getAgencyDetail} from '../../redux/dashboard/dashboardActions';
import {ASSET_URL} from '../../Environment';
import {openLinks} from '../../Utils/Utils';

const AgencyDetail = props => {
  const {data} = props.route?.params || {};
  // console.log(data);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const agencyDetail = useSelector(
    state => state.dashboard?.agencyDetails || [],
  );

  const {agency_name, agency_image, pricelist, mobile, address} =
    agencyDetail?.detail || {};

  useEffect(() => {
    setLoading(true);
    dispatch(getAgencyDetail({agencyId: data?.id, onSuccess, onFailure}));
  }, []);

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
          <ImageBackground
            source={{uri: `${ASSET_URL}${agency_image}`}}
            style={styles.topImg}
            imageStyle={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
            resizeMode="cover">
            <IBackButton onPress={onBackPress} />
          </ImageBackground>
          <View style={{flex: 0.02}} />
          <View
            style={{
              paddingHorizontal: 20,
              flex: 0.47,
              justifyContent: 'space-between',
            }}>
            <View>
              <View style={styles.agencyRow}>
                <Text style={styles.agencyName} numberOfLines={1}>
                  {agency_name || ''}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FastImage
                    source={IMAGES.IC_VERIFY}
                    style={{height: 20, width: 20, marginRight: 5}}
                    resizeMode="contain"
                  />
                  <Text style={styles.agencyVerify}>Verified by Okay</Text>
                </View>
              </View>
              <HightBox height={10} />
              <View style={styles.ratingRow}>
                <FastImage
                  source={IMAGES.IC_STAR}
                  style={{height: 17, width: 17, marginRight: 3}}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}> 4.9 </Text>
                <Text style={styles.rating}>Rating . </Text>
                <Text
                  style={{...styles.rating, textDecorationLine: 'underline'}}>
                  {agencyDetail?.totalReviews || '0'} reviews
                </Text>
              </View>
              <HightBox height={10} />
              <Text style={styles.subTitle}>Year of working: 2 yrs</Text>
              <HightBox height={10} />
              <View style={styles.ratingRow}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => openLinks(ASSET_URL + pricelist)}>
                  <FastImage
                    source={IMAGES.IC_DOWNLOAD}
                    style={{height: 17, width: 17, marginRight: 5}}
                    resizeMode="contain"
                    tintColor={COLORS.pr_blue}
                  />
                  <Text style={styles.downloadText}>Download pricelist</Text>
                </TouchableOpacity>
              </View>
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
                  <Text style={styles.address}>{address || ''}</Text>
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
                style={[styles.filledBtn, {backgroundColor: COLORS.orange}]}>
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

export default AgencyDetail;

const styles = StyleSheet.create({
  topImg: {
    flex: 0.47,
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
    width: '60%',
  },
  agencyVerify: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.textColor,
    fontSize: 12,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.textColor,
    fontSize: 16,
  },
  downloadText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.pr_blue,
    fontSize: 14,
  },
  rating: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.textColor,
    fontSize: 14,
  },
  subTitle: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.textColor,
    fontSize: 14,
    lineHeight: 18,
  },
  border: {
    borderColor: 'rgba(16, 22, 35, 0.12)',
    borderWidth: 1,
    marginVertical: 14,
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
  unfilledBtn: {
    backgroundColor: COLORS.white,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
    borderColor: COLORS.pr_blue,
    borderWidth: 1,
    flexDirection: 'row',
  },
  btnText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 22,
  },
});
