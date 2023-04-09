import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {safeAreaStyle} from '../../Common/CommonStyles';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import {IMAGES} from '../../Common/Constants/images';
import HightBox from '../Components/HightBox';
import IBackButton from '../Components/IBackButton';
import IButton from '../Components/IButton';

var types = [
  {
    id: 1,
    title: '2 BHK',
    selected: true,
  },
  {
    id: 2,
    title: '3 BHK',
    selected: false,
  },
  {
    id: 3,
    title: 'Bungalow',
    selected: false,
  },
  {
    id: 4,
    title: 'Commercial',
    selected: false,
  },
  {
    id: 5,
    title: 'Interior design',
    selected: false,
  },
  {
    id: 6,
    title: 'Industrial architecture',
    selected: false,
  },
];

const ArchitectProjectType = props => {
  const [type, setType] = useState(types);

  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onContinue = () => {
    props.navigation.navigate('CreateProject');
  };

  const onTypePress = async text => {
    const type = types.map(data => {
      if (data.title == text) {
        data.selected = !data.selected;
      }
      return data;
    });

    setType(type);
  };

  //RENDER METHODS
  const RenderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.boxContainer,
          backgroundColor: item.selected ? COLORS.pr_blue : COLORS.white,
        }}
        onPress={() => onTypePress(item.title)}>
        {item.selected && (
          <FastImage
            source={IMAGES.IC_CHECK}
            style={{height: 16, width: 16, marginRight: 6}}
            resizeMode="contain"
          />
        )}
        <Text
          style={{
            ...styles.boxText,
            color: item.selected ? COLORS.white : COLORS.textColor,
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{paddingHorizontal: 20}}>
          <IBackButton onPress={onBackPress} />
          <HightBox height={30} />
          <Text style={styles.titleText}>
            Which project types you are working on?
          </Text>

          <HightBox height={27} />

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {type.map(data => {
              return <RenderItem key={data.id} item={data} />;
            })}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={{marginTop: 30}}>
            <IButton title={'Continue'} onPress={onContinue} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ArchitectProjectType;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.textColor,
    textAlign: 'center',
  },
  bottomContainer: {paddingHorizontal: 20, marginBottom: 30},
  boxContainer: {
    backgroundColor: COLORS.pr_blue,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginRight: 8,
    marginBottom: 10,
    // paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  boxText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 14,
    color: COLORS.white,
    textAlign: 'center',
    // lineHeight: 18,
  },
});
