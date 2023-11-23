import React from 'react';
import EyeIcon from '../../icons/Eye';
import GearIcon from '../../icons/Gear';
import MostUpvoted from '../../icons/MostUpvoted';
import PopularIcon from '../../icons/Popular';
import {EFilter, TDispatch} from '../../common';
import {getFeeds, openModal, setFilter} from '../../store';
import ProfilePicture from '../../components/Common/ProfilePicture';

type TDrawerItem = {
  name: string;
  icon: any;
  onPress?: any;
};

export function drawerItems(
  color: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  navigation: any,
  dispatch: TDispatch,
  isAuthenticated: boolean,
  avatar?: string,
  token?: string,
) {
  const menus: TDrawerItem[] = [
    {
      name: 'Popular',
      icon: () => PopularIcon({fill: color}),
      onPress: () => {
        navigation.navigate('Home');
        dispatch(setFilter(EFilter.POPULAR));
        dispatch(getFeeds({popular: true}));
      },
    },
    {
      name: 'Most upvoted',
      icon: () => MostUpvoted({fill: color}),
      onPress: () => {
        navigation.navigate('Home');
        dispatch(setFilter(EFilter.MOST_UPVOTED));
        dispatch(getFeeds({mostUpvoted: true}));
      },
    },
    {
      name: 'Reading history',
      icon: () => EyeIcon({fill: color}),
      onPress: isAuthenticated
        ? () => navigation.navigate('ReadingHistory')
        : () => dispatch(openModal()),
    },
    {
      name: 'Customize',
      icon: () => GearIcon({fill: color}),
      onPress: () => setIsOpen(true),
    },
  ];
  return isAuthenticated
    ? [
        {
          name: 'My feed',
          icon: () => ProfilePicture({avatar: avatar || ''}),
          onPress: () => {
            dispatch(setFilter(null));
            dispatch(getFeeds({token: token}));
            navigation.navigate('Home');
          },
        },
        ...menus,
      ]
    : menus;
}
