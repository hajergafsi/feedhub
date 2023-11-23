import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Drawers from './navigation/drawers/Drawers';
import {useAuth} from './hooks';
import {getFeeds, getTopics, useAppDispatch} from './store';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  const {auth} = useAuth();

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 5000);
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth) {
      dispatch(getFeeds({token: auth.tokens.access.token}));
      return;
    }
    dispatch(getTopics());
    dispatch(getFeeds({}));
  }, [auth, dispatch]);

  return (
    <NavigationContainer>
      <Drawers />
    </NavigationContainer>
  );
};

export {App};
