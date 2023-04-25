import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';
import {isFunction} from '../../Utils/Utils';
import {getCategory, getProjects, searchCategory} from '../../api/dashboardApi';
import {
  onCategorySuccess,
  onGetProjectsSuccess,
  onSearchCategorySuccess,
} from './dashboardSlice';

export const getDashboardCategory = ({onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      getCategory()
        .then(response => {
          // console.log('category response---', response);
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

export const getUserProjects = ({status = 0, onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      var formdata = new FormData();
      formdata.append('status', status);
      getProjects(formdata)
        .then(response => {
          //   console.log('projects response---', response);
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

export const searchCategories = ({text, onSuccess, onFailure}) => {
  return async dispatch => {
    var formdata = new FormData();
    formdata.append('search', text);
    searchCategory(formdata)
      .then(response => {
        if (response?.status == 200) {
          if (isFunction(onSuccess)) {
            onSuccess();
          }
          dispatch(onSearchCategorySuccess(response?.data));
        }
      })
      .catch(err => {
        console.log('error in get category search data', err.response.data);
        if (isFunction(onFailure)) {
          onFailure();
        }
      });
  };
};
