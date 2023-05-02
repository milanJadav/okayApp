import React from 'react';
import {
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

const data = [
  {
    id: 1,
    bgImg: IMAGES.PAYMENT_1,
    diamondImg: IMAGES.DIAMOND_1,
    name: 'Gold',
    price: 'Rs. 15000',
    detailsArr: [
      {
        id: 1,
        title: 'All free inquires',
      },
      {
        id: 2,
        title: 'Unlimited access',
      },
      {
        id: 3,
        title: 'Best ranking to your agency',
      },
      {
        id: 4,
        title: 'Premium features access',
      },
    ],
  },
  {
    id: 2,
    bgImg: IMAGES.PAYMENT_2,
    diamondImg: IMAGES.DIAMOND_2,
    name: 'Silver',
    price: 'Rs. 10000',
    detailsArr: [
      {
        id: 1,
        title: 'All free inquires',
      },
      {
        id: 2,
        title: 'Unlimited access',
      },
      {
        id: 3,
        title: 'Best ranking to your agency',
      },
    ],
  },
  {
    id: 3,
    bgImg: IMAGES.PAYMENT_3,
    diamondImg: IMAGES.DIAMOND_3,
    name: 'Silver',
    price: 'Rs. 10000',
    detailsArr: [
      {
        id: 1,
        title: 'All free inquires',
      },
      {
        id: 2,
        title: 'Unlimited access',
      },
      {
        id: 3,
        title: 'Best ranking to your agency',
      },
    ],
  },
];

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
  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onMakePayment = () => {
    // props.navigation.navigate('Documents');
    // RazorpayCheckout.open(options) //
    //   .then(data => {
    //     // handle success
    //     console.log(data);
    //     alert(`Success: ${data.razorpay_payment_id}`);
    //   })
    //   .catch(error => {
    //     // handle failure
    //     alert(`Error: ${error.code} | ${error.description}`);
    //   });
  };
  //RENDER
  const PriceBox = ({item}) => {
    return (
      <TouchableOpacity style={{marginBottom: 10}}>
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
              <Text style={styles.priceTitleText}>{item.name}</Text>
              <HightBox height={4} />
              <Text style={styles.priceSubTitleText}>
                <Text style={styles.priceTitleText}>{item.price}</Text> /year
              </Text>
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
        {data.map(item => {
          return <PriceBox item={item} key={item.id} />;
        })}
        <View style={styles.bottomContainer}>
          <View style={{marginVertical: 30}}>
            <IButton
              title={'Make a payment'}
              onPress={() => onMakePayment()}
              // loading={loading}
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
