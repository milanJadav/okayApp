import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {COLORS} from '../../Common/Constants/colors';
import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';
import {
  setAgencyDocData,
  setAgencyProjectData,
} from '../../redux/agency/agencySlice';
import {useDispatch} from 'react-redux';

const Splash = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      localStorageHelper
        .getItemsFromStorage([
          StorageKeys.IS_LOGGED,
          StorageKeys.USER_TYPE,
          StorageKeys.PAYMENT_DONE,
          StorageKeys.FLAG,
        ])
        .then(resp => {
          let loginPreserved = resp[StorageKeys.IS_LOGGED];
          let userType = resp[StorageKeys.USER_TYPE];
          let paymentDone = resp[StorageKeys.PAYMENT_DONE];
          let flag = resp[StorageKeys.FLAG];

          if (loginPreserved == 'true' && userType !== 'null') {
            if (userType == 'Architect / Interior') {
              props.navigation.replace('ArchitectStack', {
                initialRoute: 'ArchitectBottomTab',
              });
            } else if (userType == 'Customer') {
              props.navigation.replace('CustomerStack', {
                initialRoute: 'CustomerBottomTab',
              });
            } else if (userType == 'Agency') {
              var route = 'PurchasePlan';
              if (paymentDone == 'true' && flag == '3') {
                route = 'AgencyBottomTab';
              } else if (paymentDone == 'true' && flag == '1') {
                route = 'Documents';
                const data = {
                  agencyName: 'temp',
                };
                dispatch(setAgencyDocData(data));
              } else if (paymentDone == 'true' && flag == '2') {
                route = 'Documents';
                const data = {
                  projectName: 'temp',
                };
                dispatch(setAgencyProjectData(data));
              } else if (
                paymentDone == 'true' &&
                (flag == null || flag == '0')
              ) {
                route = 'Documents';
              }
              props.navigation.replace('AgencyStack', {
                initialRoute: route,
              });
            }
          } else {
            props.navigation.replace('AuthStack');
          }
        });
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.black} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
