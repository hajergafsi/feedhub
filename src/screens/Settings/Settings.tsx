import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Header} from '../../components';
import HomesStyles from '../../styles/HomeStyles';
import {ITheme, useTheme} from '../../contexts';
import TagIcon from '../../icons/TagIcon';
import BlockIcon from '../../icons/BlockIcon';
import {
  useAppDispatch,
  openTagsModal,
  getBlockedItems,
  EBlocked,
} from '../../store';
import {useAuth} from '../../hooks';

const Settings = ({navigation}: {navigation: any}) => {
  const {auth} = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth) return;
    dispatch(
      getBlockedItems({
        token: auth.tokens.access.token,
        type: EBlocked.SOURCE,
      }),
    );
    dispatch(
      getBlockedItems({
        token: auth.tokens.access.token,
        type: EBlocked.TAG,
      }),
    );
  }, [auth, dispatch]);

  const theme = useTheme();
  const menus: {name: string; icon: any; onPress?: () => void}[] = [
    {
      name: 'Manage tags',
      icon: <TagIcon width={27} fill={theme.theme.colors.labelPrimary} />,
      onPress: () => dispatch(openTagsModal()),
    },
    {
      name: 'Blocked items',
      icon: <BlockIcon width={27} fill={theme.theme.colors.labelPrimary} />,
      onPress: () => navigation.navigate('BlockedItems'),
    },
  ];
  return (
    <View style={HomesStyles(theme).container}>
      <Header title="Filters" navigation={navigation} />
      <View style={settingsStyles(theme).body}>
        {menus.map((item, i) => (
          <TouchableOpacity
            onPress={item.onPress}
            style={settingsStyles(theme).menu}
            key={i}>
            {item.icon}
            <Text style={settingsStyles(theme).menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Settings;

const settingsStyles = (theme: ITheme) =>
  StyleSheet.create({
    body: {
      paddingVertical: 25,
    },
    menu: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 55,
      borderColor: theme.theme.colors.dividerTertiary,
      borderWidth: 1,
      gap: 15,
      paddingLeft: 15,
    },
    menuText: {
      fontWeight: '700',
      color: theme.theme.colors.labelPrimary,
      fontSize: 18,
    },
  });
