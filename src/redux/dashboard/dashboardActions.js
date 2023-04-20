import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';
import {isFunction} from '../../Utils/Utils';
import {getCategory} from '../../api/dashboardApi';
import {onCategorySuccess} from './dashboardSlice';

export const getDashboardCategory = ({onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      getCategory()
        .then(response => {
          console.log('category response---', response);
          if (response?.status == 200) {
            if (isFunction(onSuccess)) {
              onSuccess();
            }
            dispatch(onCategorySuccess(response?.data));
          }
        })
        .catch(err => {
          console.log('----', err.response.data);
          if (isFunction(onFailure)) {
            onFailure();
          }
        });
    } catch (error) {
      console.log('Error!', error);
    }
  };
};
