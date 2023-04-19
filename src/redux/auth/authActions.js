import {onLogin} from '.';
import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';
import {isFunction} from '../../Utils/Utils';
import {signIn, updateUserType, verifyOtp} from '../../api/authApis';

export const LogUserIn = ({mobileNum, onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      var formdata = new FormData();
      formdata.append('mobile', mobileNum);

      signIn(formdata).then(response => {
        console.log('login response---', response);
        if (isFunction(onSuccess)) {
          onSuccess();
        }
        dispatch(onLogin(response));
      });
    } catch (error) {
      console.log('Error!', error);
      if (isFunction(onFailure)) {
        onFailure();
      }
    }
  };
};

export const VerifyOTP = ({mobileNum, otpValue, onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      var formdata = new FormData();
      formdata.append('mobile', mobileNum);
      formdata.append('otp', otpValue);

      verifyOtp(formdata).then(response => {
        console.log('verify otp response---', response);

        if (response.access_token) {
          const storageData = {};

          storageData[StorageKeys.ACCESS_TOKEN] = response?.access_token || '';
          storageData[StorageKeys.IS_LOGGED] = 'true';
          storageData[StorageKeys.USER_ID] = String(response?.user_id) || '';

          localStorageHelper
            .setStorageItems(storageData)
            .then(() => {
              console.log('Saved user credentials in localstorage');

              if (isFunction(onSuccess)) {
                onSuccess();
              }
            })
            .catch(error => {
              console.log('handleOTPForMainApp error:', error);
              throw new Error('Error saving data.');
            });
        } else {
          if (isFunction(onFailure)) {
            onFailure(response?.message);
          }
        }
      });
    } catch (error) {
      console.log('Error!', error);
      if (isFunction(onFailure)) {
        onFailure(error);
      }
    }
  };
};

export const UpdateUserType = ({user_type, onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      var formdata = new FormData();

      localStorageHelper
        .getItemFromStorage(StorageKeys.USER_ID)
        .then(async userId => {
          formdata.append('user_id', userId);
          formdata.append('user_type', user_type);
          return updateUserType(formdata)
            .then(response => {
              if (response?.status == 200) {
                if (isFunction(onSuccess)) {
                  onSuccess();
                }
              }
            })
            .catch(err => {
              console.log('error in update user type', err.response.data);
              if (isFunction(onFailure)) {
                onFailure();
              }
            });
        });
    } catch (error) {
      console.log('Error!', error);
      if (isFunction(onFailure)) {
        onFailure();
      }
    }
  };
};
