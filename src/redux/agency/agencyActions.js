import {StorageKeys, localStorageHelper} from '../../Common/localStorageHelper';
import {plansData} from '../../Utils/Data';
import {isFunction} from '../../Utils/Utils';
import {
  agencyArchitectureList,
  agencyCustomerList,
  agencyPastArchitectList,
  agencyPastCustomerList,
  getPlans,
  saveAgencyDoc,
  savePlanPayment,
  uploadAgencyPriceList,
} from '../../api/agencyApis';
import {
  getAgencyArchitectList,
  getAgencyCustomerList,
  getAgencyPastArchitectList,
  getAgencyPastCustomerList,
  onPlansListSuccess,
} from './agencySlice';

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

export const getAgencyArchitects = ({onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      var formdata = new FormData();

      localStorageHelper
        .getItemFromStorage(StorageKeys.USER_ID)
        .then(async userId => {
          formdata.append('agency_id', userId);
          return agencyArchitectureList(formdata)
            .then(response => {
              if (response?.status == 200) {
                if (isFunction(onSuccess)) {
                  onSuccess();
                }
                dispatch(getAgencyArchitectList(response?.data || []));
              }
            })
            .catch(err => {
              console.log('error in get agency Artchitect', err.response.data);
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

export const getAgencyCustomers = ({onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      var formdata = new FormData();

      localStorageHelper
        .getItemFromStorage(StorageKeys.USER_ID)
        .then(async userId => {
          formdata.append('agency_id', userId);
          return agencyCustomerList(formdata)
            .then(response => {
              if (response?.status == 200) {
                if (isFunction(onSuccess)) {
                  onSuccess();
                }
                dispatch(getAgencyCustomerList(response?.data || []));
              }
            })
            .catch(err => {
              console.log('error in get agency customer', err.response.data);
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

export const getAgencyPastCustomers = ({onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      var formdata = new FormData();

      localStorageHelper
        .getItemFromStorage(StorageKeys.USER_ID)
        .then(async userId => {
          formdata.append('agency_id', userId);
          return agencyPastCustomerList(formdata)
            .then(response => {
              if (response?.status == 200) {
                if (isFunction(onSuccess)) {
                  onSuccess();
                }
                dispatch(getAgencyPastCustomerList(response?.data || []));
              }
            })
            .catch(err => {
              console.log('error in get agency customer', err.response.data);
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

export const getAgencyPastArchitect = ({onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      var formdata = new FormData();

      localStorageHelper
        .getItemFromStorage(StorageKeys.USER_ID)
        .then(async userId => {
          formdata.append('agency_id', userId);
          return agencyPastArchitectList(formdata)
            .then(response => {
              if (response?.status == 200) {
                if (isFunction(onSuccess)) {
                  onSuccess();
                }
                dispatch(getAgencyPastArchitectList(response?.data || []));
              }
            })
            .catch(err => {
              console.log('error in get agency customer', err.response.data);
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

export const uploadPriceList = ({payload, onSuccess, onFailure}) => {
  return async dispatch => {
    try {
      uploadAgencyPriceList(JSON.stringify(payload))
        .then(response => {
          console.log('------', response);
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
          console.log('error in save price list', err.response.data);
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
