import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountSettings} from '../../screens';
import EditProfile from '../../screens/Profile/EditProfile';
import Security from '../../screens/Profile/Security';
import Notifications from '../../screens/Profile/Notifications';

const Stack = createStackNavigator();

function AccountSettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="AccountSettings"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

export default AccountSettingsStack;
