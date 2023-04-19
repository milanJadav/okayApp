import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {COLORS} from '../../Common/Constants/colors';
import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      localStorageHelper
        .getItemsFromStorage([StorageKeys.IS_LOGGED, StorageKeys.USER_TYPE])
        .then(resp => {
          let loginPreserved = resp[StorageKeys.IS_LOGGED];
          let userType = resp[StorageKeys.USER_TYPE];

          if (loginPreserved == 'true') {
            if (userType == 'Architect / Interior') {
              props.navigation.replace('ArchitectStack', {
                initialRoute: 'ArchitectBottomTab',
              });
            } else if (userType == 'Customer') {
              props.navigation.replace('CustomerStack');
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
