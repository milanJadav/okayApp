import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {safeAreaStyle} from '../../Common/CommonStyles';
import {agenciesList} from '../../Utils/Data';
import AgencyCard from '../Components/AgencyCard';
import HightBox from '../Components/HightBox';
import INavBar from '../Components/INavBar';

const AgencyList = props => {
  const title = props.route?.params?.title;

  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  //RENDER METHODS
  const renderAgency = ({item}) => {
    return <AgencyCard />;
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <INavBar onBackPress={onBackPress} title={title} />
        <HightBox height={25} />
        <FlatList
          data={agenciesList}
          renderItem={renderAgency}
          keyExtractor={({id}) => id.toString()}
          ItemSeparatorComponent={() => <HightBox height={15} />}
          ListFooterComponent={() => <HightBox height={15} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default AgencyList;

const styles = StyleSheet.create({});
