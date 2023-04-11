import React from 'react';
import {
  FlatList,
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
import {agencies, categoryData} from '../../Utils/Data';
import {windowHeight, windowWidth} from '../../Utils/Dimentions';
import AgencyCard from '../Components/AgencyCard';
import HightBox from '../Components/HightBox';
import IBackButton from '../Components/IBackButton';
import IButton from '../Components/IButton';
import INavBar from '../Components/INavBar';

const ArchitectSelectCategory = props => {
  const title = props.route?.params?.title;

  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onCategoryPress = title => {
    props.navigation.navigate('AgencyList', {title});
  };

  //RENDER METHODS
  const renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() => onCategoryPress(item.title)}>
        <FastImage
          source={item.img}
          style={{height: 60, width: 60, borderRadius: 50}}
          resizeMode="contain"
        />
        {/* </View> */}
        <HightBox height={10} />
        <Text style={styles.boxText} numberOfLines={2}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAgency = ({item}) => {
    return <AgencyCard />;
  };

  const renderCategories = () => {
    return (
      <>
        <HightBox height={20} />
        <FlatList
          data={categoryData}
          renderItem={renderCategoryItem}
          keyExtractor={({id}) => id.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          //   style={{flex: 0.4}}
        />
      </>
    );
  };

  const renderAgencies = () => {
    return (
      <FlatList
        data={agencies}
        renderItem={renderAgency}
        keyExtractor={({id}) => id.toString()}
        ItemSeparatorComponent={() => <HightBox height={15} />}
        ListFooterComponent={() => <HightBox height={15} />}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <INavBar onBackPress={onBackPress} title={title} />
        <HightBox height={25} />
        <Text style={styles.headerText}>Select category</Text>
        <View style={{}}>{renderCategories()}</View>
        <HightBox height={20} />
        <Text style={styles.headerText}>Top agencies for you</Text>
        <HightBox height={20} />
        {renderAgencies()}
      </View>
    </SafeAreaView>
  );
};

export default ArchitectSelectCategory;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.textColor,
    fontSize: 14,
  },
  boxContainer: {
    backgroundColor: COLORS.white,
    width: '31.5%',
    height: windowHeight / 6,
    marginRight: 8,
    marginBottom: 10,
    paddingTop: 25,
    alignItems: 'center',
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  boxText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 14,
    color: COLORS.textColor,
    textAlign: 'center',
    lineHeight: 18,
    width: '70%',
  },
});
