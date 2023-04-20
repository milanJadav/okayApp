import React, {useState} from 'react';
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {safeAreaStyle} from '../../Common/CommonStyles';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import {dashboadData} from '../../Utils/Data';
import {windowHeight, windowWidth} from '../../Utils/Dimentions';
import HightBox from '../Components/HightBox';
import ISearchBar from '../Components/ISearchBar';
import LocationNavBar from '../Components/LocationNavBar';
import {useEffect} from 'react';
import {getDashboardCategory} from '../../redux/dashboard/dashboardActions';
import {useDispatch, useSelector} from 'react-redux';

const Dashboard = props => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const categoryData = useSelector(
    state => state.dashboard?.categoryData || [],
  );

  useEffect(() => {
    setLoading(true);
    dispatch(getDashboardCategory({onSuccess, onFailure}));
  }, []);

  const onSuccess = () => {
    setLoading(false);
  };

  const onFailure = () => {
    setLoading(false);
  };

  const onCategoryClick = ({title}) => {
    props.navigation.navigate('ArchitectSelectCategory', {title});
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.titleText}>No Data Available.</Text>
      </View>
    );
  };

  const onRefresh = () => {
    dispatch(getDashboardCategory({onSuccess, onFailure}));
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{...styles.boxContainer}}
        onPress={() => onCategoryClick({title: item.title})}>
        <ImageBackground
          source={item.img}
          style={styles.imgBackGround}
          resizeMode="contain">
          <Text style={styles.itemText}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <LocationNavBar />
        <HightBox height={25} />
        <ISearchBar />
        <HightBox height={25} />
        <Text style={styles.titleText}>Choose your services</Text>
        <HightBox height={20} />
        <FlatList
          data={dashboadData}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              colors={[COLORS.black]}
              onRefresh={() => onRefresh()}
            />
          }
          keyExtractor={({id}) => id.toString()}
          numColumns={2}
          style={{flex: 1}}
          ListEmptyComponent={() => ListEmptyComponent()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.textColor,
    fontSize: 14,
    lineHeight: 18,
  },
  boxContainer: {
    width: '48%',
    height: windowHeight / 4.1,
    marginRight: 15,
    borderRadius: 12,
  },
  imgBackGround: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 25,
    paddingLeft: 15,
  },
  itemText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: 18,
    color: COLORS.white,
  },
});
