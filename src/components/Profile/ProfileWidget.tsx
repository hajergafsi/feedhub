import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {ITheme, useTheme} from '../../contexts';
import {useAuth} from '../../hooks';

const ProfileWidget = () => {
  const theme = useTheme();
  const {auth} = useAuth();

  return (
    <View style={profileWidgetStyle(theme).container}>
      {auth?.user.avatar && (
        <Image
          source={{uri: auth.user.avatar}}
          style={profileWidgetStyle(theme).profileImage}
          resizeMode={'contain'}
        />
      )}
      <View style={profileWidgetStyle(theme).reputationBox}>
        <Text style={{color: theme.theme.colors.labelTertiary}}>
          Reading Streak
        </Text>
        <Text style={profileWidgetStyle(theme).scoreText}>
          {auth?.user.readingStreak}
        </Text>
      </View>
    </View>
  );
};

export default ProfileWidget;

const profileWidgetStyle = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.theme.colors.backgroundSecondary,
      height: 100,
      width: 230,
      borderRadius: 16,
      flexDirection: 'row',
    },
    profileImage: {
      height: 100,
      width: 100,
      borderRadius: 16,
    },
    reputationBox: {
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: '7%',
    },
    scoreText: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.theme.colors.labelPrimary,
    },
  });
