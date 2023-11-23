import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useTheme} from '../../contexts';
import UserIcon from '../../icons/UserIcon';
import {useAppDispatch} from '../../store';
import {openModal} from '../../store/slices';
import drawerStyle from '../../styles/DrawerStyles';

const SignUpBtn = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      style={drawerStyle(theme).signUpBtn}
      onPress={() => dispatch(openModal({}))}>
      <UserIcon fill={theme.theme.colors.labelInvert} height={25} width={25} />
      <Text style={drawerStyle(theme).signUpBtnText}>Sign Up</Text>
    </TouchableOpacity>
  );
};

export default SignUpBtn;
