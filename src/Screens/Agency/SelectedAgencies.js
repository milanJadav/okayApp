import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {safeAreaStyle} from '../../Common/CommonStyles';
import INavBar from '../Components/INavBar';
import {agenciesList} from '../../Utils/Data';
import HightBox from '../Components/HightBox';
import AgencyTypeCard from '../Components/AgencyTypeCard';

const SelectedAgencies = props => {
  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onViewAgency = () => {
    props.navigation.navigate('AgencyDetail');
  };

  //RENDER METHOD
  const renderItem = ({item}) => {
    return <AgencyTypeCard onViewAgency={onViewAgency} />;
  };

  return (
    <SafeAreaView style={{...safeAreaStyle}}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <INavBar title="Selected agencies" onBackPress={onBackPress} />
        <HightBox height={27} />
        <FlatList
          data={agenciesList}
          renderItem={renderItem}
          keyExtractor={({id}) => id.toString()}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <HightBox height={15} />}
          ListFooterComponent={() => <HightBox height={15} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectedAgencies;

const styles = StyleSheet.create({});
