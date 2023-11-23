import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, TextInput, View, Text} from 'react-native';
import {Header} from '../../components';
import {ITheme, useTheme} from '../../contexts';
import HomesStyles from '../../styles/HomeStyles';
import {getReadingHistory, useAppDispatch, useAppSelector} from '../../store';
import SearchIcon from '../../icons/Search';
import EyeIcon from '../../icons/Eye';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAuth} from '../../hooks';
import ReadingListElement from './ReadingListElement';
import FeedDetailsModal from '../../components/Feeds/FeedDetailsModal';

const ReadingHistory = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const {history} = useAppSelector(state => state.readingHistory);
  const dispatch = useAppDispatch();
  const {auth} = useAuth();

  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    auth && dispatch(getReadingHistory({token: auth.tokens.access.token}));
  }, [auth, dispatch]);

  const EmptyHistory = (
    <View style={historyStyles(theme).emptyContainer}>
      <EyeIcon fill={theme.theme.colors.active} height={75} width={75} />
      <Text style={historyStyles(theme).emptyTitle}>
        Your Reading history is empty
      </Text>
      <Text style={historyStyles(theme).emptyText}>
        Go back to your feed and read posts that spark your interest. Each post
        you read will be listed here.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={historyStyles(theme).backButton}>
        <Text style={historyStyles(theme).backButtonText}>Back to feed</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={HomesStyles(theme).container}>
      <Header title="FeedHub" navigation={navigation} />
      <FeedDetailsModal withoutNavigation />
      {history?.length === 0 && search === null ? (
        EmptyHistory
      ) : (
        <ScrollView
          contentContainerStyle={[
            HomesStyles(theme).feedsContainer,
            {alignItems: 'center', paddingHorizontal: 25},
          ]}>
          <Text style={historyStyles(theme).title}>Reading History</Text>
          <View style={historyStyles(theme).inputContainer}>
            <SearchIcon width={25} fill={theme.theme.colors.labelPrimary} />
            <TextInput
              onChangeText={(text: string) => setSearch(text)}
              value={search || ''}
              placeholder={'Search'}
              placeholderTextColor={theme.theme.colors.labelSecondary}
              style={{
                color: theme.theme.colors.labelPrimary,
                fontSize: 16,
                width: '100%',
              }}
              onEndEditing={() => {
                if (auth) {
                  dispatch(
                    getReadingHistory({
                      token: auth.tokens.access.token,
                      search: search || undefined,
                    }),
                  );
                }
              }}
            />
          </View>
          {history.map((elem, i) => (
            <View key={i}>
              {elem.activities.length > 0 ? (
                <Text style={historyStyles(theme).date}>
                  {new Date(elem.date).toDateString() ===
                  new Date().toDateString()
                    ? 'Today'
                    : new Date(elem.date).toDateString()}
                </Text>
              ) : null}
              {elem.activities.map((item, i) => (
                <ReadingListElement item={item} key={i} />
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ReadingHistory;

export const historyStyles = (theme: ITheme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%',
    },
    inputContainer: {
      backgroundColor: theme.theme.colors.float,
      width: '100%',
      height: 43,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      marginVertical: 25,
      borderColor: theme.theme.colors.labelPrimary,
      borderWidth: 1,
      gap: 5,
    },
    emptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 15,
      flex: 0.8,
      paddingHorizontal: 25,
    },
    emptyTitle: {
      fontSize: 25,
      color: theme.theme.colors.labelPrimary,
      textAlign: 'center',
    },
    emptyText: {
      fontSize: 15,
      color: theme.theme.colors.labelSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    backButton: {
      backgroundColor: theme.theme.colors.labelPrimary,
      padding: 15,
      borderRadius: 12,
      marginTop: 15,
    },
    backButtonText: {
      color: theme.theme.colors.labelInvert,
      fontWeight: '700',
      fontSize: 15,
    },
    title: {
      fontWeight: '700',
      fontSize: 18,
      textAlign: 'left',
      width: '100%',
      color: theme.theme.colors.labelPrimary,
      marginTop: 10,
    },
    date: {
      fontSize: 17,
      textAlign: 'left',
      width: '100%',
      color: theme.theme.colors.labelQuaternary,
      marginTop: 10,
    },
    postContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      gap: 10,
      marginVertical: 15,
      width: '100%',
    },
    postThumbnail: {
      width: 75,
      height: 75,
      borderRadius: 15,
    },
    postLogo: {
      width: 35,
      height: 35,
      borderRadius: 20,
      borderWidth: 6,
      borderColor: theme.theme.colors.backgroundPrimary,
      position: 'absolute',
      zIndex: 5,
      left: -15,
      backgroundColor: 'red',
    },
    imageCollage: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
    },
  });
