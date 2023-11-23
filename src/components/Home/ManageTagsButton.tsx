import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import SettingsIcon from '../../icons/Settings';
import {ITheme, useTheme} from '../../contexts';
import {openTagsModal, useAppDispatch} from '../../store';

const ManageTagsButton = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      style={styles(theme).button}
      onPress={() => dispatch(openTagsModal())}>
      <Text style={styles(theme).buttonText}>My Feed</Text>
      <SettingsIcon fill={theme.theme.colors.labelPrimary} />
    </TouchableOpacity>
  );
};

export default ManageTagsButton;

const styles = (theme: ITheme) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 35,
      gap: 5,
      marginLeft: 10,
    },
    buttonText: {
      fontSize: 17,
      fontWeight: '700',
      color: theme.theme.colors.labelPrimary,
    },
  });
