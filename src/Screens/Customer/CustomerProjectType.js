import React, {useEffect, useState} from 'react';
import {
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
import HightBox from '../Components/HightBox';
import IBackButton from '../Components/IBackButton';
import IButton from '../Components/IButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCustomerWorkType,
  saveCustomerWorkType,
} from '../../redux/auth/authActions';

var types = [
  {
    id: 1,
    title: 'Repairing/small work',
    selected: true,
  },
  {
    id: 2,
    title: 'Larger/big work',
    selected: false,
  },
];

const CustomerProjectType = props => {
  const [type, setType] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const customerTypes = useSelector(
    state => state.auth?.customerWorkType || [],
  );

  useEffect(() => {
    dispatch(getCustomerWorkType({onSuccess, onFailure}));
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

  const onContinue = () => {
    setLoading(true);
    const payload = [];

    customerTypes.forEach(element => {
      if (element.selected) {
        payload.push({
          id: element.id,
          work_type_name: element.work_type_name,
        });
      }
    });

    dispatch(
      saveCustomerWorkType({payload, onSuccess: onSaveWorktype, onFailure}),
    );
  };

  const onSaveWorktype = () => {
    setLoading(false);
    // props.navigation.replace('');
  };

  const onTypePress = async text => {
    const type = customerTypes.map(data => {
      if (data.work_type_name == text) {
        data.selected = true;
      } else {
        data.selected = false;
      }
      return data;
    });

    setType(type);
  };

  //RENDER METHODS
  const RenderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          ...styles.boxContainer,
        }}
        onPress={() => onTypePress(item.work_type_name)}>
        {item.selected ? (
          <FastImage
            source={IMAGES.FILLED_RADIO}
            style={{height: 16, width: 16, marginRight: 12}}
            resizeMode="contain"
          />
        ) : (
          <FastImage
            source={IMAGES.UNFILLED_RADIO}
            style={{height: 16, width: 16, marginRight: 12}}
            resizeMode="contain"
          />
        )}
        <Text
          style={{
            ...styles.boxText,
            // color: item.selected ? COLORS.white : COLORS.textColor,
          }}>
          {item.work_type_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{paddingHorizontal: 20}}>
          <IBackButton onPress={onBackPress} />
          <HightBox height={30} />
          <Text style={styles.titleText}>Select your work type</Text>

          <HightBox height={27} />

          <View style={{}}>
            {customerTypes.map(data => {
              return <RenderItem key={data.id} item={data} />;
            })}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={{marginTop: 30}}>
            <IButton
              title={'Continue'}
              onPress={onContinue}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomerProjectType;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONTS.OUTFIT_MEDIUM,
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.textColor,
    textAlign: 'center',
  },
  bottomContainer: {paddingHorizontal: 20, marginBottom: 30},
  boxContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    // flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    // marginRight: 8,
    marginBottom: 10,
    // paddingTop: 25,
    alignItems: 'center',
    // justifyContent: 'center',/
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  boxText: {
    fontFamily: FONTS.OUTFIT_REGULAR,
    fontSize: 16,
    color: COLORS.textColor,
    textAlign: 'center',
    // lineHeight: 18,
  },
});
