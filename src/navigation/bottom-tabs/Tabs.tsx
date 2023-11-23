import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Bookmarks, Home, NotificationsScreen, Search} from '../../screens';
import {View, StyleSheet} from 'react-native';
import HomeIcon from '../../icons/Home';
import BookmarkIcon from '../../icons/Bookmark';
import SearchIcon from '../../icons/Search';
import SettingsIcon from '../../icons/Settings';
import {useTheme} from '../../contexts';
import {useAuth} from '../../hooks';
import NotificationsIcon from '../../icons/Notification';
import FiltersStack from '../stacks/FiltersStack';

const Tab = createBottomTabNavigator();

const CustomTab: React.FC<{
  icon: JSX.Element;
  focused: boolean;
}> = ({icon, focused}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        TabsNavigatorStyles.customTab,
        focused && {
          ...TabsNavigatorStyles.focused,
          backgroundColor: theme.theme.colors.active,
        },
      ]}>
      {focused && (
        <View
          style={[
            TabsNavigatorStyles.horizontalLine,
            {backgroundColor: theme.theme.colors.labelPrimary},
          ]}
        />
      )}
      {icon}
    </View>
  );
};

const Tabs = () => {
  const theme = useTheme();
  const {auth} = useAuth();

  const isAuthenticated = !!auth?.tokens?.access.token;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          borderTopColor: theme.theme.colors.dividerPrimary,
          borderTopWidth: 0.5,
          height: 50,
          backgroundColor: theme.theme.colors.backgroundPrimary,
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        /* children={() => <Home navigation={navigation} />} */
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <CustomTab
                icon={
                  <HomeIcon
                    stroke={
                      focused ? 'transparent' : theme.theme.colors.labelTertiary
                    }
                    fill={
                      focused ? theme.theme.colors.labelPrimary : 'transparent'
                    }
                  />
                }
                focused={focused}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <CustomTab
                icon={
                  <BookmarkIcon
                    fill={focused && theme.theme.colors.labelPrimary}
                    stroke={
                      focused
                        ? theme.theme.colors.labelPrimary
                        : theme.theme.colors.labelTertiary
                    }
                  />
                }
                focused={focused}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <CustomTab
                icon={
                  <SearchIcon
                    fill={
                      focused
                        ? theme.theme.colors.labelPrimary
                        : theme.theme.colors.labelTertiary
                    }
                  />
                }
                focused={focused}
              />
            );
          },
        }}
      />
      {isAuthenticated && (
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <CustomTab
                  icon={
                    <NotificationsIcon
                      stroke={
                        focused
                          ? 'transparent'
                          : theme.theme.colors.labelTertiary
                      }
                      width={35}
                      fill={
                        focused
                          ? theme.theme.colors.labelPrimary
                          : 'transparent'
                      }
                    />
                  }
                  focused={focused}
                />
              );
            },
          }}
        />
      )}
      <Tab.Screen
        name="Settings"
        component={FiltersStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <CustomTab
                icon={
                  <SettingsIcon
                    fill={
                      focused
                        ? theme.theme.colors.labelPrimary
                        : theme.theme.colors.labelTertiary
                    }
                  />
                }
                focused={focused}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const TabsNavigatorStyles = StyleSheet.create({
  customTab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  focused: {
    borderRadius: 14,
    justifyContent: 'flex-start',
  },
  horizontalLine: {
    height: 1,
    width: 55,
    marginBottom: 7,
    marginTop: -1,
  },
});
