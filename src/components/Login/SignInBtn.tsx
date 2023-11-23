import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ITheme, useTheme} from '../../contexts';

type Props = {
  text: string;
  icon: any;
  background: string;
  textColor: string;
};

const SignInBtn = ({text, icon, background, textColor}: Props) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={btnStyles(theme, background).btnContainer}>
      {icon}
      <Text style={{color: textColor, marginLeft: 10}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SignInBtn;

export const btnStyles = (theme: ITheme, background: string) =>
  StyleSheet.create({
    btnContainer: {
      backgroundColor: background,
      width: '100%',
      height: 40,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 25,
      paddingHorizontal: 10,
    },
  });
