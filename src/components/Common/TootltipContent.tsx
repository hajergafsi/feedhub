import React from 'react';
import {StyleProp, ViewStyle, View, TouchableOpacity, Text} from 'react-native';
import {TMenuItem} from '../../common';
import drawerStyle from '../../styles/DrawerStyles';
import {useTheme} from '../../contexts';

type Props = {
  extraStyling: StyleProp<ViewStyle>;
  items: TMenuItem[];
};

const TootltipContent = (props: Props) => {
  const theme = useTheme();
  return (
    <View style={[drawerStyle(theme).settingsMenu, props.extraStyling]}>
      {props.items.map((item, i) => (
        <TouchableOpacity
          onPress={() => {
            item.onPress();
          }}
          style={drawerStyle(theme).settingsModalItem}
          key={i}>
          {item.icon}
          <Text style={{color: theme.theme.colors.labelTertiary}}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TootltipContent;
