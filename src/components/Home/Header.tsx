import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../../contexts';
import Hamburger from '../../icons/Hamburger';
import HomesStyles from '../../styles/HomeStyles';

type Props = {
  title: string;
  navigation: any;
};

const Header = ({title, navigation}: Props) => {
  const theme = useTheme();
  return (
    <View style={[HomesStyles(theme).header]}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={HomesStyles(theme).HambergerBtnContainer}>
        <Hamburger
          fill={theme.theme.colors.labelTertiary}
          height={30}
          width={30}
        />
      </TouchableOpacity>
      <Text style={HomesStyles(theme).headerTitle}> {title}</Text>
      <View style={HomesStyles(theme).HambergerBtnContainer}>
        {/* <GearIcon fill={theme.theme.colors.labelTertiary} /> */}
      </View>
    </View>
  );
};

export default Header;
