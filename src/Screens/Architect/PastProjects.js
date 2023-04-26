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
import {agenciesList, projectsData} from '../../Utils/Data';
import HightBox from '../Components/HightBox';
import ProjectCard from '../Components/ProjectCard';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProjects} from '../../redux/dashboard/dashboardActions';
import {COLORS} from '../../Common/Constants/colors';

const PastProjects = props => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const pastProjectData = useSelector(
    state => state.dashboard?.pastProjectsData || [],
  );

  useEffect(() => {
    setLoading(true);
    dispatch(getUserProjects({status: 0, onSuccess, onFailure}));
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

  const onCardPress = data => {
    props.navigation.navigate('ProjectDetail', {projectId: data?.id});
  };

  //RENDER METHOD
  const renderItem = ({item}) => {
    return <ProjectCard onPress={onCardPress} data={item} />;
  };

  const renderLoading = () => (
    <ActivityIndicator size={'small'} color={COLORS.black} />
  );

  return (
    <SafeAreaView style={{...safeAreaStyle}}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <INavBar title="Past Projects" onBackPress={onBackPress} />
        <HightBox height={27} />
        {loading ? (
          renderLoading()
        ) : (
          <FlatList
            data={pastProjectData}
            renderItem={renderItem}
            keyExtractor={({id}) => id?.toString()}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <HightBox height={15} />}
            ListFooterComponent={() => <HightBox height={15} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PastProjects;

const styles = StyleSheet.create({});
