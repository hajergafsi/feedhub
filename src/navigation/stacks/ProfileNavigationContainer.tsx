import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from '../../screens';
import AccountSettingsStack from './AccountSettingsStack';

const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="AccountSettingsStack"
        component={AccountSettingsStack}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
