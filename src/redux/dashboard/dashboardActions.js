import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';
import {isFunction} from '../../Utils/Utils';
import {getCategory, getProjects} from '../../api/dashboardApi';
import {onCategorySuccess, onGetProjectsSuccess} from './dashboardSlice';

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

export const getUserProjects = ({onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      getProjects()
        .then(response => {
          console.log('projects response---', response);
          if (response?.status == 200) {
            if (isFunction(onSuccess)) {
              onSuccess();
            }
            dispatch(onGetProjectsSuccess(response?.data));
          }
        })
        .catch(err => {
          console.log('error in get projects---', err.response.data);
          if (isFunction(onFailure)) {
            onFailure();
          }
        });
    } catch (error) {
      console.log('Error!', error);
    }
  };
};
