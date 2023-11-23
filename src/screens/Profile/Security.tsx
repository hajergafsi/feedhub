import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../components';
import {ITheme, useTheme} from '../../contexts';
import EyeIcon from '../../icons/Eye';
import GoogleUniColor from '../../icons/GoogleUniColor';
import LockIcon from '../../icons/Lock';
import RightArrowIcon from '../../icons/RightArrow';
import HomesStyles from '../../styles/HomeStyles';
import ProfileStyles from '../../styles/ProfileStyles';
import {useAuth} from '../../hooks';
import {deleteUser, updateUser, useAppDispatch} from '../../store';

const Security = ({navigation}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>();
  const [password, setPassword] = useState<string>('');
  const {auth} = useAuth();
  const dispatch = useAppDispatch();

  const deleteUserFunc = () => {
    dispatch(
      deleteUser({
        token: auth?.tokens.access.token || '',
        id: auth?.user.id || '',
      }),
    );
  };

  const handleDeleteConfirmation = () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: deleteUserFunc,
        },
      ],
    );
  };

  return (
    <View style={HomesStyles(theme).container}>
      <Header navigation={navigation} title={'FeedHub'} />
      <View style={styles(theme).topRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles(theme).oppositeReverse}>
          <RightArrowIcon width={20} height={20} />
        </TouchableOpacity>
        <Text style={ProfileStyles(theme).profileDetailsName}>Security</Text>
      </View>
      <ScrollView contentContainerStyle={styles(theme).body}>
        <Text style={styles(theme).titleStyle}>Account number</Text>
        <Text style={styles(theme).description}>
          The phone number associated with your FeedHub account
        </Text>
        <View style={styles(theme).inputContainer}>
          <View style={[styles(theme).spacing, {width: '87%'}]}>
            <TextInput
              editable={false}
              value={auth?.user.phone}
              style={{
                color: theme.theme.colors.labelPrimary,
                fontSize: 16,
              }}
            />
            <LockIcon fill={theme.theme.colors.labelTertiary} />
          </View>
        </View>
        <Text style={[styles(theme).titleStyle]}>Set your password</Text>
        <View style={styles(theme).inputContainer}>
          <LockIcon fill={theme.theme.colors.labelTertiary} />
          <View style={[styles(theme).spacing, {width: '87%'}]}>
            <TextInput
              secureTextEntry={!showPassword}
              /*  onChangeText={handleChange('password')}
              onBlur={handleBlur('password')} */
              value={password}
              textContentType={'password'}
              placeholder={'Password'}
              onChangeText={text => setPassword(text)}
              placeholderTextColor={theme.theme.colors.labelTertiary}
              style={{
                color: theme.theme.colors.labelPrimary,
                fontSize: 16,
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <EyeIcon fill={theme.theme.colors.labelTertiary} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            dispatch(
              updateUser({
                id: auth?.user.id || '',
                token: auth?.tokens.access.token || '',
                credentials: {password: password},
              }),
            )
          }
          style={[ProfileStyles(theme).detailsBtn, {marginVertical: 15}]}>
          <Text style={ProfileStyles(theme).detailsBtnText}>Set password</Text>
        </TouchableOpacity>
        <Text style={[styles(theme).titleStyle]}>🚨 Danger Zone</Text>
        <View style={styles(theme).dangerZone}>
          <Text style={styles(theme).dangerZoneText}>
            Deleting your account will:
          </Text>
          <Text style={[styles(theme).marginTop, styles(theme).dangerZoneText]}>
            1. Permanently delete your profile, along with your authentication
            associations.
          </Text>
          <Text style={styles(theme).dangerZoneText}>
            2. Permanently delete all your content, including your posts,
            bookmarks, comments, upvotes, etc.
          </Text>
          <Text style={styles(theme).dangerZoneText}>
            3. Allow your username to become available to anyone.
          </Text>
          <Text style={[styles(theme).marginTop, styles(theme).dangerZoneText]}>
            Important: deleting your account is unrecoverable and cannot be
            undone. Feel free to contact support@feedhub.com with any questions.
          </Text>
          <TouchableOpacity
            style={styles(theme).deleteAccountBtn}
            onPress={handleDeleteConfirmation}>
            <Text style={styles(theme).deleteAccountBtnText}>
              Delete account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (theme: ITheme) =>
  StyleSheet.create({
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      paddingHorizontal: 15,
      gap: 15,
      borderBottomColor: theme.theme.colors.dividerTertiary,
      borderBottomWidth: 1,
    },
    oppositeReverse: {
      transform: [{rotate: '-90deg'}],
    },
    body: {
      padding: 20,
    },
    titleStyle: {
      fontSize: 17,
      fontWeight: '700',
      color: theme.theme.colors.labelPrimary,
    },
    description: {
      fontSize: 15,
      color: theme.theme.colors.labelTertiary,
      marginTop: 10,
    },
    inputContainer: {
      backgroundColor: theme.theme.colors.float,
      width: '100%',
      height: 43,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      marginTop: 20,
    },
    spacing: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      width: '73%',
    },
    removeBtn: {
      backgroundColor: theme.theme.colors.backgroundTertiary,
      height: 50,
      marginVertical: 15,
      width: '70%',
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      padding: 10,
    },
    removeBtnText: {
      color: theme.theme.colors.labelPrimary,
      fontSize: 15,
    },
    dangerZone: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderColor: theme.theme.colors.statusError,
      borderWidth: 1,
      marginTop: 10,
      borderRadius: 26,
    },
    dangerZoneText: {
      color: theme.theme.colors.labelTertiary,
      fontSize: 15,
    },
    deleteAccountBtn: {
      backgroundColor: theme.theme.colors.colorKetchup,
      paddingHorizontal: 15,
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 20,
      width: 130,
      height: 32,
    },
    deleteAccountBtnText: {
      color: theme.theme.colors.labelPrimary,
      fontSize: 15,
      fontWeight: '700',
    },
    marginTop: {
      marginTop: 20,
    },
  });

export default Security;
