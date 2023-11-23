import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import {Header} from '../../components';
import {ITheme, useTheme} from '../../contexts';
import RightArrowIcon from '../../icons/RightArrow';
import HomesStyles from '../../styles/HomeStyles';
import ProfileStyles from '../../styles/ProfileStyles';

const Notifications = ({navigation}) => {
  const theme = useTheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  return (
    <View style={HomesStyles(theme).container}>
      <Header navigation={navigation} title={'FeedHub'} />
      <View style={styles(theme).topRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles(theme).oppositeReverse}>
          <RightArrowIcon width={20} height={20} />
        </TouchableOpacity>
        <Text style={ProfileStyles(theme).profileDetailsName}>
          Notifications
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles(theme).body}>
        <View style={styles(theme).row}>
          <View style={{width: '70%'}}>
            <Text style={styles(theme).titleStyle}>Push notifications</Text>
            <Text style={styles(theme).description}>
              The FeedHub notification system notifies you of important events
              such as replies, mentions, updates, etc.
            </Text>
          </View>
          <View style={styles(theme).separator} />
          <View>
            <TouchableOpacity style={styles(theme).option}>
              <Switch
                trackColor={{
                  false: theme.theme.colors.overlayQuaternary,
                  true: theme.theme.colors.overlayCabbage,
                }}
                thumbColor={
                  pushNotifications
                    ? theme.theme.colors.statusCabbage
                    : theme.theme.colors.labelTertiary
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setPushNotifications(!pushNotifications)}
                value={pushNotifications}
              />
              <Text style={styles(theme).optionText}>
                {pushNotifications ? 'On' : 'Off'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;

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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      gap: 5,
    },
    optionText: {
      color: theme.theme.colors.labelPrimary,
      fontWeight: '700',
    },
    separator: {
      backgroundColor: theme.theme.colors.dividerTertiary,
      width: 1,
      height: '100%',
    },
  });
