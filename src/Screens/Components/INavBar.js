import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import {windowWidth} from '../../Utils/Dimentions';
import IBackButton from './IBackButton';

const INavBar = ({onBackPress = () => {}, title = ''}) => {
  return (
    <View style={styles.container}>
      <IBackButton onPress={onBackPress} />
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{width: windowWidth / 10.5}} />
    </View>
  );
};

export default INavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.textColor,
    fontSize: 18,
  },
});
