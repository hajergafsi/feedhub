import {useCallback} from 'react';
import {authActionCreators, useAppDispatch, useAppSelector} from '../store';
import {IAuth} from '../store';

export const useAuth = () => {
  const {data} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const setAuth = useCallback(
    (auth: IAuth) => {
      dispatch(authActionCreators.setAuth(auth));
    },
    [dispatch],
  );

  return {
    auth: data,
    setAuth,
  };
};
