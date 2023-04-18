import {onLogin} from '.';
import {signIn} from '../../api/authApis';

export const LogUserIn = userCredentials => {
  return async dispatch => {
    try {
      var formdata = new FormData();
      formdata.append('mobile', '8460980007');

      signIn(formdata).then(response => {
        console.log(response);
        dispatch(onLogin(response));
      });
    } catch (error) {
      console.log('Error!', error);
    }
  };
};
