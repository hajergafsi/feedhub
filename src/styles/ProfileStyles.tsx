import {StyleSheet} from 'react-native';
import {ITheme} from '../contexts';

const ProfileStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      padding: 20,
    },
    profileDetails: {
      paddingVertical: 20,
      justifyContent: 'space-between',
      gap: 15,
    },
    profileDetailsName: {
      color: theme.theme.colors.labelPrimary,
      fontSize: 20,
      fontWeight: '700',
    },
    profileDetailsUsername: {
      color: theme.theme.colors.labelSecondary,
      fontSize: 15,
      fontWeight: '400',
    },
    profileDetailsDate: {
      color: theme.theme.colors.labelQuaternary,
      fontSize: 13,
    },
    detailsBtn: {
      backgroundColor: 'transparent',
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
      borderRadius: 12,
      borderColor: theme.theme.colors.labelPrimary,
      borderWidth: 1,
    },
    detailsBtnText: {
      fontWeight: '700',
      color: theme.theme.colors.labelPrimary,
      fontSize: 15,
    },
  });

export default ProfileStyles;
