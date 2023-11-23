import {StyleSheet} from 'react-native';
import {ITheme} from '../contexts';

const drawerStyle = (theme: ITheme) =>
  StyleSheet.create({
    headerContainer: {
      height: 120,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 20,
    },
    signUpBtn: {
      width: '80%',
      backgroundColor: theme.theme.colors.backgroundReverse,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 6,
    },
    signUpBtnText: {
      color: theme.theme.colors.labelInvert,
      fontWeight: '600',
      marginLeft: 4,
      fontSize: 15,
    },
    drawerItem: {
      height: 44,
      justifyContent: 'center',
    },
    drawerItemContainer: {
      height: 340,
      flexDirection: 'column',
      gap: -6,
    },
    profileSection: {
      padding: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    profileButton: {
      flexDirection: 'row',
      backgroundColor: theme.theme.colors.backgroundSecondary,
      borderRadius: 8,
      width: 80,
      alignItems: 'center',
    },
    profileButtonText: {
      color: theme.theme.colors.labelPrimary,
      fontSize: 15,
      width: '50%',
      fontWeight: '700',
      textAlign: 'center',
    },
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 10,
    },
    settingsModal: {justifyContent: 'flex-start', alignItems: 'center'},
    settingsModalItem: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      gap: 10,
      marginVertical: 4,
    },
    settingsMenu: {
      shadowColor: theme.theme.colors.shadow2,
      elevation: 9,
      backgroundColor: theme.theme.colors.backgroundSecondary,
      top: '8.5%',
      width: 160,
      paddingVertical: 10,
      borderRadius: 12,
      borderColor: theme.theme.colors.dividerSecondary,
      borderWidth: 1,
      zIndex: 5,
    },
  });

export default drawerStyle;
