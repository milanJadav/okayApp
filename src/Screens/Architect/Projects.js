import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  RefreshControl,
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
import {agenciesList, dashboadData} from '../../Utils/Data';
import {windowHeight, windowWidth} from '../../Utils/Dimentions';
import HightBox from '../Components/HightBox';
import ISearchBar from '../Components/ISearchBar';
import LocationNavBar from '../Components/LocationNavBar';
import ProjectCard from '../Components/ProjectCard';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProjects} from '../../redux/dashboard/dashboardActions';

const Projects = props => {
  const projectDataRedux = useSelector(
    state => state.dashboard?.projectsData || [],
  );

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [projectData, setProjectData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectDataRedux) {
      setProjectData(projectDataRedux);
    }
  }, [projectDataRedux]);

  useEffect(() => {
    setLoading(true);
    dispatch(getUserProjects({status: 1, onSuccess, onFailure}));
  }, []);

  const onSuccess = () => {
    setLoading(false);
  };

  const onFailure = () => {
    setLoading(false);
  };

  //CLICK EVENTS
  const onCreate = () => {
    props.navigation.navigate('CreateProject');
  };

  const onCardPress = data => {
    props.navigation.navigate('ProjectDetail', {projectId: data?.id});
  };

  const onSearchTextChange = text => {
    setSearchText(text);
    filterItemsList(text);
  };

  const filterItemsList = text => {
    let tempArr = [...projectDataRedux];
    let updatedList = [];
    tempArr.map(item => {
      let tempItem = {
        ...item,
      };

      if (item.project_name.toLowerCase().includes(text.toLowerCase()))
        updatedList.push(tempItem);
    });

    setProjectData(updatedList);
  };

  const onRefresh = () => {
    dispatch(getUserProjects({status: 1, onSuccess, onFailure}));
  };

  const renderLoading = () => (
    <ActivityIndicator size={'small'} color={COLORS.black} />
  );

  const ListEmptyComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.titleText}>No Projects Found.</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return <ProjectCard onPress={onCardPress} data={item} />;
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <LocationNavBar />
        <HightBox height={25} />
        <ISearchBar
          value={searchText}
          onChangeText={text => onSearchTextChange(text)}
        />
        <HightBox height={25} />

        {loading ? (
          renderLoading()
        ) : (
          <FlatList
            data={projectData}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                colors={[COLORS.black]}
                onRefresh={() => onRefresh()}
              />
            }
            keyExtractor={({id}) => id.toString()}
            ListEmptyComponent={() => ListEmptyComponent()}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <HightBox height={15} />}
            ListFooterComponent={() => <HightBox height={15} />}
          />
        )}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onCreate()}>
          <FastImage
            source={IMAGES.IC_PLUS}
            style={{height: 24, width: 24}}
            resizeMode="contain"
            tintColor={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Projects;

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
  actionButton: {
    position: 'absolute',
    backgroundColor: COLORS.pr_blue,
    padding: 15,
    borderRadius: 50,
    bottom: 30,
    right: 25,
  },
});
