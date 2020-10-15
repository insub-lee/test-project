import { useReducer, useEffect } from 'react';
import request from 'utils/request';

const initialState = {
  authInfo: null,
  isError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH_INFO':
      return {
        ...state,
        authInfo: { ...action.payload },
        isError: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        authInfo: null,
        isError: true,
      };
    default:
      return state;
  }
};

/* Session 정보 통해 TPMS용 유저 정보를 가져온다. */
export default () => {
  const [{ authInfo, isError }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      const url = '/apigate/v1/portal/auth/userInfo';
      const { response, error } = request({
        url,
      });
      return { response, error };
    };

    fetchUser()
      .then(({ response, error }) => {
        if (response && !error) {
          dispatch({
            type: 'SET_AUTH_INFO',
            payload: {
              ...response,
            },
          });
        } else {
          dispatch({
            type: 'SET_ERROR',
          });
        }
      })
      .catch(() => {
        dispatch({
          type: 'SET_ERROR',
        });
      });
  }, []);

  return {
    authInfo,
    isError,
  };
};
