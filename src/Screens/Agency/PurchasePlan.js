import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import {safeAreaStyle} from '../../Common/CommonStyles';
import INavBar from '../Components/INavBar';
import HightBox from '../Components/HightBox';
import IButton from '../Components/IButton';
import {FONTS} from '../../Common/Constants/fonts';
import {COLORS} from '../../Common/Constants/colors';
import FastImage from 'react-native-fast-image';
import {IMAGES} from '../../Common/Constants/images';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPlansList,
  saveAgencyPayment,
} from '../../redux/agency/agencyActions';
import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';
import moment from 'moment';

var options = {
  description: 'Credits towards consultation',
  image: 'https://i.imgur.com/3g7nmJC.png',
  currency: 'INR',
  key: 'rzp_test_OIr0Tqto8rXMCT', // Your api key
  amount: '5000',
  name: 'foo',
  prefill: {
    email: 'void@razorpay.com',
    contact: '9191919191',
    name: 'Milan',
  },
  theme: {color: COLORS.pr_blue},
};

const PurchasePlan = props => {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [planData, setPlanData] = useState([]);
  const dispatch = useDispatch();

  const plansData = useSelector(state => state.agency?.plans || []);

  useEffect(() => {
    setLoading(true);
    dispatch(getPlansList({onSuccess, onFailure}));
  }, []);

  useEffect(() => {
    if (plansData) {
      setPlanData(plansData);
    }
  }, [plansData]);

  const onSuccess = () => {
    setLoading(false);
  };

  const onFailure = () => {
    setLoading(false);
  };

  const onSuccessSavePayment = () => {
    setBtnLoading(false);
    localStorageHelper
      .setStorageItem({key: StorageKeys.PAYMENT_DONE, value: 'true'})
      .then(res => {
        console.log('payment set success');
      });
    props.navigation.replace('Documents');
  };

  const onFailureSavePayment = () => {
    setBtnLoading(false);
  };
  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onMakePayment = data => {
    // const selectedItem = planData.find(i => i.selected);
    const selectedItem = data;
    // if (!selectedItem) {
    //   alert('Please Select Plan!!');
    //   return;
    // }
    var options = {
      description: 'Purchase Plan for Membership',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_OIr0Tqto8rXMCT', // Your api key
      amount: Number(`${selectedItem.plan_price}00`),
      name: selectedItem?.plan_name || 'Plan',
      theme: {color: COLORS.pr_blue},
    };

    RazorpayCheckout.open(options) //
      .then(data => {
        // console.log(data);
        setBtnLoading(true);

        localStorageHelper
          .getItemFromStorage(StorageKeys.USER_ID)
          .then(async userId => {
            const payload = {
              agencyId: userId,
              paymentPlanId: selectedItem?.id,
              paymentStatus: 'Success',
              paymentAmount: selectedItem.plan_price,
              paymentTime: moment().format('YYYY-MM-DD'),
            };
            dispatch(
              saveAgencyPayment({
                payload,
                onSuccess: onSuccessSavePayment,
                onFailure: onFailureSavePayment,
              }),
            );
          });
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const onClickPlan = data => {
    const plans = planData.map(item => {
      if (item.plan_name == data) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    setPlanData(plans);
  };

  //RENDER

  const renderLoading = () => (
    <ActivityIndicator size={'small'} color={COLORS.black} />
  );

  const PriceBox = ({item}) => {
    return (
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => onMakePayment(item)}>
        <ImageBackground
          source={item.bgImg}
          resizeMode="cover"
          style={{padding: 16}}
          imageStyle={{borderRadius: 16}}>
          <View style={styles.boxTopContainer}>
            <View style={styles.diamondBG}>
              <FastImage
                source={item.diamondImg}
                style={{height: 35, width: 35}}
                resizeMode="contain"
              />
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceTitleText}>{item.plan_name}</Text>
              <HightBox height={4} />
              <Text style={styles.priceSubTitleText}>
                <Text style={styles.priceTitleText}>{item.plan_price}</Text>{' '}
                /year
              </Text>
            </View>
            <View style={styles.selectView}>
              {item.selected ? (
                <FastImage
                  source={IMAGES.FILLED_RADIO}
                  style={{height: 16, width: 16}}
                  resizeMode="contain"
                  tintColor={COLORS.white}
                />
              ) : (
                <FastImage
                  source={IMAGES.UNFILLED_RADIO}
                  style={{height: 16, width: 16}}
                  resizeMode="contain"
                  tintColor={COLORS.white}
                />
              )}
            </View>
          </View>
          <HightBox height={15} />
          {item.detailsArr.map(item => {
            return (
              <View style={styles.detailRow} key={item.id}>
                <View style={styles.checkBG}>
                  <FastImage
                    source={IMAGES.IC_CHECK}
                    style={{height: 10, width: 10}}
                    resizeMode="contain"
                    tintColor={COLORS.black}
                  />
                </View>
                <Text style={styles.detailsText} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20}}>
        <INavBar onBackPress={onBackPress} />
      </View>
      <ScrollView style={{paddingHorizontal: 20, flex: 1}}>
        <HightBox height={'2%'} />
        <FastImage
          source={IMAGES.AGENCY_GRP}
          style={{height: 50, width: '100%', marginBottom: 3}}
          resizeMode="contain"
        />
        <HightBox height={'4%'} />
        <Text style={styles.titleText}>More than 150+ agencies joined us!</Text>
        <Text style={styles.subTitleText}>
          Select plan that best suits your need
        </Text>
        <HightBox height={27} />

        {loading
          ? renderLoading()
          : planData.map(item => {
              return <PriceBox item={item} key={item.id} />;
            })}
        <View style={styles.bottomContainer}>
          <View style={{marginVertical: 30}}>
            <IButton
              title={'Make a payment'}
              onPress={() => {
                // props.navigation.replace('Documents');
                // onMakePayment();
              }}
              loading={btnLoading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PurchasePlan;

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
    marginTop: 5,
  },
  bottomContainer: {paddingHorizontal: 20, marginBottom: 30},
  boxTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: '100%',
  },
  priceTag: {
    marginLeft: 10,
  },
  diamondBG: {
    backgroundColor: '#BF6747',
    padding: 12,
    borderRadius: 50,
  },
  priceTitleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: 22,
    lineHeight: 25,
    color: COLORS.white,
  },
  priceSubTitleText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.white,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '90%',
  },
  detailsText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 16,
    color: COLORS.white,
    // lineHeight: 5,
  },
  checkBG: {
    padding: 4,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    marginRight: 10,
  },
});
