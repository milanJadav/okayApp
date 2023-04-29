import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import {agencies} from '../../Utils/Data';
import {windowHeight} from '../../Utils/Dimentions';
import AgencyCard from '../Components/AgencyCard';
import HightBox from '../Components/HightBox';
import INavBar from '../Components/INavBar';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCategoryWiseAgency,
  getSubCategory,
} from '../../redux/dashboard/dashboardActions';

const ArchitectSelectCategory = props => {
  const {item} = props.route?.params || {};

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const subCategoryData = useSelector(
    state => state.dashboard?.subCategoryData || [],
  );

  const categoryWiseAgencies = useSelector(
    state => state.dashboard?.categoryWiseAgency || [],
  );

  useEffect(() => {
    setLoading(true);
    dispatch(getSubCategory({categoryId: item?.id, onSuccess, onFailure}));
    dispatch(
      getCategoryWiseAgency({categoryId: item?.id, onSuccess, onFailure}),
    );
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

  const onCategoryPress = item => {
    props.navigation.navigate('AgencyList', {item});
  };

  const onViewAgency = () => {
    props.navigation.navigate('AgencyDetail');
  };

  const onChooseAgency = () => {
    props.navigation.navigate('SelectProjects');
  };

  const renderLoading = () => (
    <ActivityIndicator size={'small'} color={COLORS.black} />
  );

  const ListEmptyComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.headerText}>No Data Available.</Text>
      </View>
    );
  };

  //RENDER METHODS
  const renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={() => onCategoryPress(item)}>
        <FastImage
          source={require('../../assets/temp/wooden.png')}
          style={{height: 60, width: 60, borderRadius: 50}}
          resizeMode="contain"
        />
        {/* </View> */}
        <HightBox height={10} />
        <Text style={styles.boxText} numberOfLines={2}>
          {item?.subcategory_name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAgency = ({item}) => {
    return (
      <AgencyCard
        data={item}
        onViewAgency={onViewAgency}
        onChooseAgency={onChooseAgency}
      />
    );
  };

  const renderCategories = () => {
    return (
      <>
        <HightBox height={20} />
        <FlatList
          data={subCategoryData}
          renderItem={renderCategoryItem}
          keyExtractor={({id}) => id.toString()}
          numColumns={3}
          ListEmptyComponent={() => ListEmptyComponent()}
          showsVerticalScrollIndicator={false}
          //   style={{flex: 0.4}}
        />
      </>
    );
  };

  const renderAgencies = () => {
    return (
      <FlatList
        data={categoryWiseAgencies}
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
        <INavBar onBackPress={onBackPress} title={item?.category_name} />
        <HightBox height={25} />
        {loading && renderLoading()}
        {!loading && (
          <>
            <Text style={styles.headerText}>Select category</Text>
            <View style={{}}>{renderCategories()}</View>
            <HightBox height={20} />
            <Text style={styles.headerText}>Top agencies for you</Text>
            <HightBox height={20} />
            {renderAgencies()}
          </>
        )}
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
