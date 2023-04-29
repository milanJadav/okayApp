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
import {agenciesList} from '../../Utils/Data';
import AgencyCard from '../Components/AgencyCard';
import HightBox from '../Components/HightBox';
import INavBar from '../Components/INavBar';
import {useDispatch, useSelector} from 'react-redux';
import {getSubCategoryWiseAgency} from '../../redux/dashboard/dashboardActions';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';

const AgencyList = props => {
  const data = props.route?.params?.item;

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const allAgencies = useSelector(
    state => state.dashboard?.allAgencyData || [],
  );

  useEffect(() => {
    setLoading(true);
    dispatch(
      getSubCategoryWiseAgency({subCategoryId: data?.id, onSuccess, onFailure}),
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

  //RENDER METHODS
  const renderLoading = () => (
    <ActivityIndicator size={'small'} color={COLORS.black} />
  );

  const ListEmptyComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.titleText}>No Data Available.</Text>
      </View>
    );
  };

  const renderAgency = ({item}) => {
    return <AgencyCard data={item} />;
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <INavBar onBackPress={onBackPress} title={data?.category_name} />
        <HightBox height={25} />
        {loading && renderLoading()}
        {!loading && (
          <FlatList
            data={allAgencies}
            renderItem={renderAgency}
            keyExtractor={({id}) => id.toString()}
            ItemSeparatorComponent={() => <HightBox height={15} />}
            ListFooterComponent={() => <HightBox height={15} />}
            ListEmptyComponent={() => ListEmptyComponent()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AgencyList;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.textColor,
    fontSize: 14,
    lineHeight: 18,
  },
});
