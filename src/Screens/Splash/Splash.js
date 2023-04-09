import React, {useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {COLORS} from '../../Common/Constants/colors';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('AuthStack');
    }, 1000);
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
