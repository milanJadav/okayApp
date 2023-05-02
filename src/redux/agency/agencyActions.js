import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';
import {plansData} from '../../Utils/Data';
import {isFunction} from '../../Utils/Utils';
import {getPlans} from '../../api/agencyApis';
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
