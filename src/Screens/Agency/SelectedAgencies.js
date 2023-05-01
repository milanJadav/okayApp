import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {safeAreaStyle} from '../../Common/CommonStyles';
import INavBar from '../Components/INavBar';
import {agenciesList} from '../../Utils/Data';
import HightBox from '../Components/HightBox';
import AgencyTypeCard from '../Components/AgencyTypeCard';
import {useDispatch, useSelector} from 'react-redux';
import {getSelectedAgenciesofUser} from '../../redux/dashboard/dashboardActions';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';

const SelectedAgencies = props => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userAgencies = useSelector(
    state => state.dashboard?.userAssignedAgencyList || [],
  );

  useEffect(() => {
    setLoading(true);
    dispatch(getSelectedAgenciesofUser({onSuccess, onFailure}));
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

  const onViewAgency = () => {
    props.navigation.navigate('AgencyDetail');
  };

  //RENDER METHOD
  const renderItem = ({item}) => {
    return <AgencyTypeCard onViewAgency={onViewAgency} data={item} />;
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.titleText}>No Data Available.</Text>
      </View>
    );
  };

  const renderLoading = () => (
    <ActivityIndicator size={'small'} color={COLORS.black} />
  );

  return (
    <SafeAreaView style={{...safeAreaStyle}}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <INavBar title="Selected agencies" onBackPress={onBackPress} />
        <HightBox height={27} />
        {loading ? (
          renderLoading()
        ) : (
          <FlatList
            data={userAgencies}
            renderItem={renderItem}
            keyExtractor={({id}) => id.toString()}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => ListEmptyComponent()}
            ItemSeparatorComponent={() => <HightBox height={15} />}
            ListFooterComponent={() => <HightBox height={15} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SelectedAgencies;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.textColor,
    fontSize: 14,
    lineHeight: 18,
  },
});
