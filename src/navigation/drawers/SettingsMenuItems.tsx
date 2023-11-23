import React from 'react';
import EyeIcon from '../../icons/Eye';
import MostUpvoted from '../../icons/MostUpvoted';
import UserIcon from '../../icons/UserIcon';
import DevCard from '../../icons/DevCard';

type TMenuItem = {
  name: string;
  icon: any;
  onPress?: any;
};

export function SettingsMenuItems() {
  const menus: TMenuItem[] = [
    {
      name: 'Profile',
      icon: <UserIcon />,
    },
    {
      name: 'Account details',
      icon: <MostUpvoted />,
    },
    {
      name: 'Dev card',
      icon: <DevCard />,
    },
    {
      name: 'Logout',
      icon: <EyeIcon />,
    },
  ];
  return menus;
}
