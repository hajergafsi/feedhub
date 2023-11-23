import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BlockedItems from '../../screens/Settings/BlockedItems';
import {Settings} from '../../screens';
import {openModal, useAppDispatch} from '../../store';
import {useAuth} from '../../hooks';

const Stack = createStackNavigator();

function FiltersStack({navigation}: {navigation: any}) {
  const dispatch = useAppDispatch();
  const {auth} = useAuth();
  const isAuthenticated = !!auth?.tokens?.access.token;
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openModal());
      navigation.goBack();
    }
  }, [dispatch, isAuthenticated, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'tabPress',
      async (e: {target: string | string[]; preventDefault: () => void}) => {
        if (e.target.includes('Settings') && !isAuthenticated) {
          dispatch(openModal());
          e.preventDefault();
        }
      },
    );

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation, isAuthenticated, dispatch]);
  return (
    <Stack.Navigator
      initialRouteName="Filters"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Filters" component={Settings} />
      <Stack.Screen name="BlockedItems" component={BlockedItems} />
    </Stack.Navigator>
  );
}

export default FiltersStack;
