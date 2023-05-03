import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';
import {plansData} from '../../Utils/Data';
import {isFunction} from '../../Utils/Utils';
import {getPlans, saveAgencyDoc, savePlanPayment} from '../../api/agencyApis';
import {onPlansListSuccess} from './agencySlice';

// import {onProfileDataSuccess} from './agencySlice';

export const getPlansList = ({onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      getPlans()
        .then(response => {
          var finalArr = [];
          if (response?.status == 200) {
            if (isFunction(onSuccess)) {
              onSuccess();
            }

            plansData.forEach((item, index) => {
              response?.data.forEach((item1, index1) => {
                if (index == index1) {
                  finalArr.push({
                    ...item1,
                    ...item,
                    selected: false,
                  });
                }
              });
            });
            dispatch(onPlansListSuccess(finalArr || []));
          }
        })
        .catch(err => {
          console.log('get plans error---', err.response.data);
          if (isFunction(onFailure)) {
            onFailure();
          }
        });
    } catch (error) {
      console.log('Error!', error);
    }
  };
};

export const saveAgencyPayment = ({payload, onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      savePlanPayment(JSON.stringify(payload))
        .then(response => {
          if (response?.status == 200) {
            if (isFunction(onSuccess)) {
              onSuccess();
            }
          } else {
            if (isFunction(onFailure)) {
              onFailure();
            }
          }
        })
        .catch(err => {
          console.log('error in save payment', err.response.data);
          if (isFunction(onFailure)) {
            onFailure();
          }
        });
    } catch (error) {
      console.log('Error!', error);
      if (isFunction(onFailure)) {
        onFailure();
      }
    }
  };
};

export const saveAgencyDocuments = ({payload, onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      saveAgencyDoc(JSON.stringify(payload))
        .then(response => {
          if (response?.status == 200) {
            if (isFunction(onSuccess)) {
              onSuccess();
            }
          } else {
            if (isFunction(onFailure)) {
              onFailure();
            }
          }
        })
        .catch(err => {
          console.log('error in save agency', err.response.data);
          if (isFunction(onFailure)) {
            onFailure();
          }
        });
    } catch (error) {
      console.log('Error!', error);
      if (isFunction(onFailure)) {
        onFailure();
      }
    }
  };
};
