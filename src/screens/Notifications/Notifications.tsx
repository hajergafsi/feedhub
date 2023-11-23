import React from 'react';
import HomesStyles from '../../styles/HomeStyles';
import {ITheme, useTheme} from '../../contexts';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Header} from '../../components';
import NotificationsIcon from '../../icons/Notification';

const Notifications = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  return (
    <View style={HomesStyles(theme).container}>
      <Header title="Feedhub" navigation={navigation} />
      <View style={notificationsStyles(theme).body}>
        <Text style={notificationsStyles(theme).title}>Notifications</Text>
        <TouchableOpacity style={notificationsStyles(theme).notificationButton}>
          <View style={notificationsStyles(theme).iconContainer}>
            <NotificationsIcon />
          </View>
          <View style={{width: '87%'}}>
            <Text
              style={{
                fontSize: 15,
                color: theme.theme.colors.labelPrimary,
                lineHeight: 20,
              }}>
              Welcome to your new notification center!
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: theme.theme.colors.labelTertiary,
                marginTop: 7,
                lineHeight: 20,
              }}>
              The notification system notifies you of important events such as
              replies, mentions, updates etc.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notifications;

const notificationsStyles = (theme: ITheme) =>
  StyleSheet.create({
    body: {
      padding: 25,
    },
    title: {
      fontWeight: '700',
      fontSize: 18,
      color: theme.theme.colors.labelPrimary,
    },
    notificationButton: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 10,
      marginTop: 50,
      gap: 15,
    },
    iconContainer: {
      backgroundColor: theme.theme.colors.float,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 7,
      borderRadius: 10,
      height: 40,
    },
  });
