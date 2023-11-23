import {TouchableOpacity} from '@gorhom/bottom-sheet';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Header} from '../../components';
import {ITheme, useTheme} from '../../contexts';
import ExitIcon from '../../icons/Exit';
import LockIcon from '../../icons/Lock';
import NotificationsIcon from '../../icons/Notification';
import RightArrowIcon from '../../icons/RightArrow';
import HomesStyles from '../../styles/HomeStyles';
import ProfileStyles from '../../styles/ProfileStyles';
import {useAuth} from '../../hooks';

const AccountSettings = ({navigation}) => {
  const theme = useTheme();
  const {auth} = useAuth();
  const menus = [
    {
      name: 'Profile',
      routeName: 'EditProfile',
      icon: (
        <Image
          source={{uri: auth?.user.avatar}}
          style={AccountSettingsStyles(theme).avatarContainer}
        />
      ),
    },
    {
      name: 'Security',
      routeName: 'Security',
      icon: <LockIcon fill={theme.theme.colors.labelSecondary} />,
    },
    {
      name: 'Notifications',
      routeName: 'Notifications',
      icon: <NotificationsIcon fill={theme.theme.colors.labelSecondary} />,
    },
  ];

  return (
    <View style={HomesStyles(theme).container}>
      <Header navigation={navigation} title={'FeedHub'} />
      <View style={AccountSettingsStyles(theme).topRow}>
        <Text style={ProfileStyles(theme).profileDetailsName}>
          Account Settings
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ExitIcon />
        </TouchableOpacity>
      </View>
      <View style={AccountSettingsStyles(theme).menusContainer}>
        {menus.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate(item.routeName)}
            style={[
              AccountSettingsStyles(theme).topRow,
              AccountSettingsStyles(theme).menuButton,
            ]}>
            <View style={AccountSettingsStyles(theme).row}>
              {item.icon}
              <Text style={AccountSettingsStyles(theme).menuText}>
                {item.name}
              </Text>
            </View>
            <View style={AccountSettingsStyles(theme).reverse}>
              <RightArrowIcon width={25} height={25} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={AccountSettingsStyles(theme).bottomBox}>
        <TouchableOpacity>
          <Text style={AccountSettingsStyles(theme).menuText}>
            Privacy policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={AccountSettingsStyles(theme).menuText}>
            Terms of service
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountSettings;

const AccountSettingsStyles = (theme: ITheme) =>
  StyleSheet.create({
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
      paddingHorizontal: 15,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    reverse: {
      transform: [{rotate: '90deg'}],
    },
    menusContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
      gap: 10,
    },
    avatarContainer: {
      width: 30,
      height: 30,
      borderRadius: 25,
    },
    menuButton: {
      borderRadius: 16,
      borderColor: theme.theme.colors.labelQuaternary,
      borderWidth: 1,
    },
    menuText: {
      color: theme.theme.colors.labelTertiary,
      fontSize: 15,
    },
    bottomBox: {
      padding: 20,
      borderWidth: 1,
      borderColor: theme.theme.colors.dividerTertiary,
      borderRadius: 16,
      marginHorizontal: 20,
      marginTop: '25%',
      gap: 15,
    },
  });
