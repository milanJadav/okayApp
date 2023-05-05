import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {safeAreaStyle} from '../../Common/CommonStyles';
import {COLORS} from '../../Common/Constants/colors';
import {FONTS} from '../../Common/Constants/fonts';
import {IMAGES} from '../../Common/Constants/images';
import HightBox from '../Components/HightBox';
import IBackButton from '../Components/IBackButton';
import IButton from '../Components/IButton';
import ICheckBox from '../Components/ICheckBox';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserProjects,
  saveArchitectProject_Agencies,
} from '../../redux/dashboard/dashboardActions';

const SelectProjects = props => {
  const {data} = props.route?.params || {};

  const projectDataRedux = useSelector(
    state => state.dashboard?.projectsData || [],
  );
  const [showSearch, setShowSearch] = useState(false);
  const [showSelectedPro, setShowSelectedPro] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProjects({status: 1}));
  }, []);

  useEffect(() => {
    if (projectDataRedux) {
      setProjectData(projectDataRedux);
    }
  }, [projectDataRedux]);

  const onSuccess = () => {
    setLoading(false);
    props.navigation.pop(2);
  };

  const onFailure = () => {
    setLoading(false);
  };

  //CLICK EVENTS
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const onContinue = () => {
    if (selectedProject.length > 0) {
      const payload = selectedProject.map(item => {
        return {
          agency_id: data?.id || '',
          project_id: item.id,
        };
      });

      dispatch(saveArchitectProject_Agencies({payload, onSuccess, onFailure}));
    } else {
      alert('Please Select Project First!');
    }
  };

  const onShowSearch = value => {
    setShowSearch(!showSearch);
    setShowSelectedPro(false);
    if (!value) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setFadeAnim(new Animated.Value(1));
      });
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0.1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setFadeAnim(new Animated.Value(0));
      });
    }
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
        selected: false,
      };

      if (item.project_name.toLowerCase().includes(text.toLowerCase()))
        updatedList.push(tempItem);
    });

    setProjectData(updatedList);
  };

  const onCheckBoxClick = name => {
    const newArray = projectData.map(i => {
      if (i.project_name == name) {
        return {
          ...i,
          selected: !i.selected,
        };
      } else {
        return {...i};
      }
    });

    setProjectData(newArray);
  };

  const onApplyProjectSelection = () => {
    const filteredArray = projectData.filter(i => i.selected);
    if (filteredArray.length == 0) {
      alert('Please Select Project!!');
      return;
    }
    setSelectedProject(filteredArray);
    onShowSearch(showSearch);
    setShowSelectedPro(!showSelectedPro);
  };

  const onClearAll = () => {
    const newArray = projectData.map(i => {
      return {...i, selected: false};
    });
    setProjectData(newArray);
  };

  const onRemoveProject = value => {
    const filterData = selectedProject.filter(i => i.project_name !== value);
    setSelectedProject(filterData);
  };
  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{paddingHorizontal: 20}}>
          <IBackButton onPress={onBackPress} />
          <HightBox height={30} />
          <Text style={styles.titleText}>
            For which projects you are selecting this agency ?
          </Text>

          <HightBox height={30} />

          <TouchableOpacity
            style={styles.dropDowncontainer}
            onPress={() => onShowSearch(showSearch)}
            activeOpacity={0.9}>
            <Text style={styles.dropText}>Select projects</Text>
            <FastImage
              source={IMAGES.IC_ARROW_DOWN}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* project search */}
          {showSearch && (
            <Animated.View
              style={[styles.projectSearchContainer, {opacity: fadeAnim}]}>
              <View style={styles.searchBoxContainer}>
                <FastImage
                  source={IMAGES.IC_SEARCH}
                  style={{height: 16, width: 16}}
                  resizeMode="contain"
                />

                <TextInput
                  value={searchText}
                  onChangeText={t => onSearchTextChange(t)}
                  style={styles.inputStyle}
                  placeholder={'Search projects'}
                  placeholderTextColor={COLORS.textColor44}
                />
              </View>
              <HightBox height={15.5} />
              <ScrollView style={{maxHeight: '50%'}}>
                {projectData.map(item => {
                  return (
                    <View key={item.id} style={styles.projectRow}>
                      <ICheckBox
                        value={item.selected}
                        onCheckClick={() => onCheckBoxClick(item.project_name)}
                      />
                      <View style={{width: 10}} />
                      <Text style={styles.projectNameText}>
                        {item.project_name}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
              <HightBox height={15} />
              <View style={[styles.projectRow, {marginBottom: 0}]}>
                <TouchableOpacity
                  style={[styles.filledBtn]}
                  onPress={() => onApplyProjectSelection()}>
                  <Text style={styles.btnText}>{'Apply'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{marginLeft: 15}}
                  onPress={() => onClearAll()}>
                  <Text style={[styles.btnText, {color: COLORS.pr_blue}]}>
                    {'Clear all'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
          <HightBox height={20} />

          {showSelectedPro && (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {selectedProject.map(i => {
                return (
                  <View key={i.id} style={styles.selectedProRow}>
                    <Text style={styles.projectNameText}>{i.project_name}</Text>
                    <TouchableOpacity
                      onPress={() => onRemoveProject(i.project_name)}>
                      <FastImage
                        source={IMAGES.IC_CROSS}
                        style={{height: 16, width: 16, marginLeft: 5}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.bottomContainer}>
          {showSelectedPro && (
            <View style={{marginTop: 30}}>
              <IButton title={'Save'} onPress={onContinue} loading={loading} />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectProjects;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.textColor,
    textAlign: 'center',
  },
  bottomContainer: {paddingHorizontal: 20, marginBottom: 30},
  dropDowncontainer: {
    height: 48,
    borderColor: COLORS.textColor,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  dropText: {
    fontFamily: FONTS.OUTFIT_LIGHT,
    color: COLORS.textColor44,
    fontSize: 14,
  },
  projectSearchContainer: {
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    padding: 16,
    marginTop: 10,
    borderRadius: 12,
  },
  searchBoxContainer: {
    width: '100%',
    borderColor: COLORS.textColor64,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: FONTS.OUTFIT_LIGHT,
    color: COLORS.textColor,
    padding: Platform.OS == 'android' ? 0 : 0,
  },
  projectRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  projectNameText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 14,
    color: COLORS.textColor,
  },
  filledBtn: {
    backgroundColor: COLORS.pr_blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  btnText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: 14,
    color: COLORS.white,
  },
  selectedProRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    borderRadius: 30,
    marginRight: 8,
    marginBottom: 10,
  },
});
