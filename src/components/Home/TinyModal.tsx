import React from 'react';
import {View, TouchableOpacity, Text, StyleProp, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {ITheme} from '../../contexts';
import drawerStyle from '../../styles/DrawerStyles';

const TinyModal = ({
  isModalOpen,
  setModal,
  theme,
  menus,
  extraStyling,
}: {
  isModalOpen: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  theme: ITheme;
  menus: any[];
  extraStyling?: StyleProp<ViewStyle>;
}) => {
  return (
    <Modal
      isVisible={isModalOpen}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={[
        drawerStyle(theme).settingsModal,
        {position: 'relative', top: 100},
      ]}
      backdropOpacity={0.2}
      onBackdropPress={() => {
        setModal(false);
      }}>
      <View style={[drawerStyle(theme).settingsMenu, extraStyling]}>
        {menus.map((item, i) => (
          <TouchableOpacity
            onPress={() => {
              setModal(false);
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
    </Modal>
  );
};

export default TinyModal;
