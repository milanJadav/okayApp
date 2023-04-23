import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {safeAreaStyle} from '../../Common/CommonStyles';
import INavBar from '../Components/INavBar';
import {agenciesList, projectsData} from '../../Utils/Data';
import HightBox from '../Components/HightBox';
import ProjectCard from '../Components/ProjectCard';

const PastProjects = props => {
  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onCardPress = () => {
    props.navigation.navigate('ProjectDetail');
  };

  //RENDER METHOD
  const renderItem = ({item}) => {
    return <ProjectCard onPress={onCardPress} data={item} />;
  };

  return (
    <SafeAreaView style={{...safeAreaStyle}}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <INavBar title="Selected agencies" onBackPress={onBackPress} />
        <HightBox height={27} />
        <FlatList
          data={projectsData}
          renderItem={renderItem}
          keyExtractor={({id}) => id?.toString()}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <HightBox height={15} />}
          ListFooterComponent={() => <HightBox height={15} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default PastProjects;

const styles = StyleSheet.create({});
