import {TouchableOpacity} from '@gorhom/bottom-sheet';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native';
import {Header} from '../../components';
import ProfileWidget from '../../components/Profile/ProfileWidget';
import UserActivity from '../../components/Profile/UserActivity';
import {useTheme} from '../../contexts';
import {useAuth} from '../../hooks';
import HomesStyles from '../../styles/HomeStyles';
import ProfileStyles from '../../styles/ProfileStyles';
import {getProfile, useAppDispatch} from '../../store';

const Profile = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {auth} = useAuth();

  useEffect(() => {
    auth && dispatch(getProfile(auth.tokens.access.token));
  }, [auth, dispatch]);

  return (
    <View style={HomesStyles(theme).container}>
      <Header title="FeedHub" navigation={navigation} />
      <ScrollView style={ProfileStyles(theme).container}>
        <ProfileWidget />
        <View style={ProfileStyles(theme).profileDetails}>
          {/* <Text style={ProfileStyles(theme).profileDetailsName}>John Doe</Text> */}
          <Text style={ProfileStyles(theme).profileDetailsUsername}>
            @{auth?.user.username}
          </Text>
          <Text style={ProfileStyles(theme).profileDetailsDate}>
            Joined on {new Date(auth?.user.createdAt).toUTCString()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AccountSettingsStack')}
          style={ProfileStyles(theme).detailsBtn}>
          <Text style={ProfileStyles(theme).detailsBtnText}>
            Account Settings
          </Text>
        </TouchableOpacity>
        <UserActivity />
      </ScrollView>
    </View>
  );
};

export default Profile;
