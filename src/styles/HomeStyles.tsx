import {StyleSheet} from 'react-native';
import {ITheme} from '../contexts';

const HomesStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.theme.colors.backgroundPrimary,
    },
    header: {
      height: 60,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItem: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: theme.theme.colors.dividerTertiary,
    },
    headerTitle: {
      fontSize: 17,
      color: theme.theme.colors.labelTertiary,
      fontWeight: '600',
      verticalAlign: 'middle',
    },
    HambergerBtnContainer: {
      justifyContent: 'center',
      height: '100%',
      width: 50,
      alignItems: 'center',
    },
    feedsContainer: {
      padding: 15,
    },
  });

export default HomesStyles;
