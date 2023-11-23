import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ITheme, useTheme} from '../../contexts';

type Props = {
  text: string;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

const TopicBox = (props: Props) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={
        props.selected
          ? () =>
              props.setSelected(selected =>
                [...selected].filter(item => item !== props.text),
              )
          : () => props.setSelected(selected => [...selected, props.text])
      }
      style={[
        boxStyles(theme).container,
        props.selected && boxStyles(theme).selectedBox,
      ]}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default TopicBox;

const boxStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      width: 128,
      height: 128,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.theme.colors.dividerTertiary,
      borderRadius: 10,
    },
    selectedBox: {
      backgroundColor: theme.theme.colors.colorCabbage,
    },
  });
