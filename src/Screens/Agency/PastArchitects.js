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
import HightBox from '../Components/HightBox';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import UserCard from '../Components/UserCard';
import {getAgencyPastArchitect} from '../../redux/agency/agencyActions';

const PastArchitects = props => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const pastArchitects = useSelector(
    state => state.agency?.pastArchitectList || [],
  );

  useEffect(() => {
    setLoading(true);
    dispatch(getAgencyPastArchitect({onSuccess, onFailure}));
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

  //RENDER METHOD
  const renderItem = ({item}) => {
    return (
      <UserCard
        data={item}
        onViewCustomer={data =>
          props.navigation.navigate('ClientDetails', {data})
        }
      />
    );
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
        <INavBar title="Past architects" onBackPress={onBackPress} />
        <HightBox height={27} />
        {loading ? (
          renderLoading()
        ) : (
          <FlatList
            data={pastArchitects}
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

export default PastArchitects;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    color: COLORS.textColor,
    fontSize: 14,
    lineHeight: 18,
  },
});
