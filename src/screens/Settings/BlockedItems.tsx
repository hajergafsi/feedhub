import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Header} from '../../components';
import HomesStyles from '../../styles/HomeStyles';
import {ITheme, useTheme} from '../../contexts';
import RightArrowIcon from '../../icons/RightArrow';
import BlockIcon from '../../icons/BlockIcon';
import {unblockItem, useAppDispatch, useAppSelector} from '../../store';
import {useAuth} from '../../hooks';

const BlockedItems = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const {auth} = useAuth();
  const dispatch = useAppDispatch();
  const {blockedSources, blockedTags} = useAppSelector(
    state => state.blockedItems,
  );

  return (
    <View style={HomesStyles(theme).container}>
      <Header title="Filters" navigation={navigation} />
      <View style={blockedItemsStyles(theme).header}>
        <TouchableOpacity
          style={blockedItemsStyles(theme).rotate}
          onPress={() => navigation.goBack()}>
          <RightArrowIcon
            width={25}
            height={25}
            fill={theme.theme.colors.labelTertiary}
          />
        </TouchableOpacity>
        <Text style={blockedItemsStyles(theme).headerText}>Blocked items</Text>
      </View>
      <View style={blockedItemsStyles(theme).body}>
        <Text style={blockedItemsStyles(theme).textStyle}>
          Block tags and sources directly from the feed. Whenever you see a post
          with a tag/source you wish to block, click on the more options button
          (⋮) and choose “Not interested in…“.
        </Text>
        <Text style={blockedItemsStyles(theme).title}>Blocked tags</Text>
        {blockedTags.map((item, i) => (
          <View key={i} style={blockedItemsStyles(theme).row}>
            <Text style={blockedItemsStyles(theme).textStyle}>
              #{item.value}
            </Text>
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  unblockItem({
                    id: item.id,
                    token: auth?.tokens.access.token || '',
                  }),
                )
              }>
              <BlockIcon fill={theme.theme.colors.labelTertiary} />
            </TouchableOpacity>
          </View>
        ))}
        <Text style={blockedItemsStyles(theme).title}>Blocked sources</Text>
        {blockedSources.map((e, i) => (
          <View style={blockedItemsStyles(theme).row} key={i}>
            <View
              style={[
                blockedItemsStyles(theme).row,
                {justifyContent: 'flex-start', width: 'auto', gap: 10},
              ]}>
              {/* <Image
                source={{uri: data[4].sourceLogo}}
                style={{width: 40, height: 40, borderRadius: 9}}
              /> */}
              <Text style={blockedItemsStyles(theme).textStyle}>{e.value}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  unblockItem({
                    id: e.id,
                    token: auth?.tokens.access.token || '',
                  }),
                )
              }>
              <BlockIcon fill={theme.theme.colors.labelTertiary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BlockedItems;

const blockedItemsStyles = (theme: ITheme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 55,
      paddingLeft: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.theme.colors.active,
    },
    rotate: {
      transform: [{rotate: '-90deg'}],
      height: '100%',
    },
    body: {
      padding: 30,
    },
    headerText: {
      color: theme.theme.colors.labelTertiary,
      fontWeight: '700',
      fontSize: 15,
    },
    textStyle: {
      lineHeight: 20,
      color: theme.theme.colors.labelTertiary,
    },
    title: {
      color: theme.theme.colors.labelPrimary,
      fontWeight: '700',
      fontSize: 18,
      marginTop: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      height: 50,
    },
  });
