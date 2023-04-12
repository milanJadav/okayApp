import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import {IMAGES} from '../../Common/Constants/images';
import {windowHeight} from '../../Utils/Dimentions';

const AgencyCard = ({onViewAgency = () => {}}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <FastImage
        source={require('../../assets/temp/agencyPic.png')}
        style={styles.img}
        resizeMode="cover"
      />
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.title}>The Beyark agency</Text>
          <Text style={styles.subTitle}>Year of working: 2 yrs</Text>
          <View style={styles.ratingRow}>
            <FastImage
              source={IMAGES.IC_STAR}
              style={{height: 14, width: 14}}
              resizeMode="contain"
            />
            <Text style={styles.ratingText}> 4.9 </Text>
            <Text style={styles.rating}>Rating </Text>
          </View>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity style={[styles.filledBtn]}>
            <Text style={styles.btnText}>{'Choose this'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.unfilledBtn]}
            onPress={() => onViewAgency()}>
            <FastImage
              source={IMAGES.IC_EYE}
              style={{height: 16, width: 16, marginRight: 5}}
              resizeMode="contain"
            />
            <Text style={styles.title}>{'View'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AgencyCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    height: windowHeight / 5.9,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    marginRight: 5,
  },
  img: {
    height: windowHeight / 5.9,
    width: '35%',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  rightContainer: {
    marginHorizontal: 12,
    marginRight: 15,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  title: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.textColor,
    fontSize: 16,
    lineHeight: 18,
  },
  subTitle: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.textColor64,
    fontSize: 14,
    lineHeight: 18,
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.textColor,
    fontSize: 14,
    lineHeight: 18,
  },
  rating: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    color: COLORS.textColor,
    fontSize: 14,
    lineHeight: 18,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filledBtn: {
    backgroundColor: COLORS.pr_blue,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
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
    fontSize: 14,
    color: COLORS.white,
  },
});
