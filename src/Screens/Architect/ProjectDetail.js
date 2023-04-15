import React from 'react';
import {
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

const ProjectDetail = props => {
  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onViewAgency = () => {
    props.navigation.navigate('AgencyDetail');
  };

  //RENDER METHODS

  const RenderAgency = ({item}) => {
    return (
      <View style={{marginBottom: 10}}>
        <AgencyTypeCard onViewAgency={onViewAgency} />
      </View>
    );
  };

  const renderAgencies = () => {
    return (
      <View>
        <HightBox height={20} />
        {agencies.map(item => {
          return <RenderAgency key={item.id} />;
        })}
      </View>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={safeAreaStyle}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 0.53,
          }}>
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
        </View>
        <HightBox height={25} />
        <View style={{paddingHorizontal: 20, flex: 0.47}}>
          <Text style={styles.agencyName} numberOfLines={1}>
            Rock and Roll Hall of Fame
          </Text>

          <HightBox height={16} />

          <View style={styles.ratingRow}>
            <FastImage
              source={IMAGES.IC_USER}
              style={{height: 16, width: 16}}
              resizeMode="contain"
            />

            <View style={{width: '90%', marginLeft: 10}}>
              <Text style={styles.clientName}>Client: Mexon Menon</Text>
            </View>
          </View>

          <View style={styles.border} />
          <Text style={[styles.agencyName, {fontSize: 18}]} numberOfLines={1}>
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
              <Text style={styles.address}>
                106 - City plaza 2, near sciencity,sola, Ahmedabad - 9008
              </Text>
            </View>
          </View>
          <HightBox height={20} />

          <Text style={[styles.agencyName, {fontSize: 18}]} numberOfLines={1}>
            Progress
          </Text>
          <View style={{marginVertical: 10}}>
            <ProgressBar
              height={10}
              backgroundColor={'rgba(0, 100, 229, 0.12)'}
              completedColor={COLORS.pr_blue}
              percentage={'33%'}
            />
          </View>
          <Text style={styles.progressText}>33% Completed</Text>
          <View style={styles.border} />

          {/* Agency View */}
          <Text style={[styles.agencyName, {fontSize: 18}]} numberOfLines={1}>
            Assigned agencies
          </Text>
          {renderAgencies()}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProjectDetail;

const styles = StyleSheet.create({
  topImg: {
    height: windowHeight / 2.8,
    width: windowWidth,
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
    marginVertical: 20,
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
});
