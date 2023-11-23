import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useTheme} from '../../contexts';
import HomesStyles from '../../styles/HomeStyles';
import {Header} from '../../components';
import {
  getBookmarks,
  openModal,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {useAuth} from '../../hooks';
import BookmarkIcon from '../../icons/Bookmark';
import FeedCard from '../../components/Home/FeedCard';
import {shareMenuItems} from '../Home/Home';
import {searchStyles} from '../Search/Search';
import SearchIcon from '../../icons/Search';
import {EFeedCategory} from '../../common';

const Bookmarks = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const {auth} = useAuth();
  const isAuthenticated = !!auth?.tokens?.access.token;
  const {bookmarks} = useAppSelector(state => state.bookmarks);

  useEffect(() => {
    auth && dispatch(getBookmarks({token: auth.tokens.access.token}));
  }, [auth, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openModal());
      navigation.goBack();
    }
  }, [dispatch, isAuthenticated, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'tabPress',
      async (e: {target: string | string[]; preventDefault: () => void}) => {
        if (e.target.includes('Bookmark') && !isAuthenticated) {
          dispatch(openModal());
          e.preventDefault();
        }
      },
    );

    // Unsubscribe to event listener when component unmount
    return () => unsubscribe();
  }, [navigation, isAuthenticated, dispatch]);

  return (
    <View style={HomesStyles(theme).container}>
      <Header title="Bookmarks" navigation={navigation} />
      {bookmarks.length ? (
        <ScrollView contentContainerStyle={HomesStyles(theme).feedsContainer}>
          <View style={searchStyles(theme).inputContainer}>
            <SearchIcon width={25} fill={theme.theme.colors.labelPrimary} />
            <TextInput
              onChangeText={(text: string) => setSearch(text)}
              value={search}
              placeholder={'Search'}
              onEndEditing={() =>
                dispatch(
                  getBookmarks({
                    search: search,
                    token: auth?.tokens.access.token || '',
                  }),
                )
              }
              placeholderTextColor={theme.theme.colors.labelSecondary}
              style={{
                color: theme.theme.colors.labelPrimary,
                fontSize: 16,
                width: '100%',
              }}
            />
          </View>
          {bookmarks?.map((item, i) => (
            <FeedCard
              key={i}
              title={item.title}
              caption={item.caption}
              thumbnail={item.thumbnail}
              sourceName={item.sourceName}
              sourceLogo={item.sourceLogo}
              sourceURL={item.sourceURL}
              upVotes={item.upVotes}
              comments={item.comments}
              tags={item.tags}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              isUpVotedByUser={item.isUpVotedByUser}
              id={item.id}
              index={i}
              shareMenuItems={shareMenuItems(
                theme.theme.colors.labelTertiary,
                navigation,
                item,
                bookmarks,
                isAuthenticated,
                dispatch,
                auth?.tokens.access.token,
              )}
              feedCategory={EFeedCategory.BOOKMARKS}
            />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{alignItems: 'center', paddingTop: 35, paddingHorizontal: 25}}>
          <BookmarkIcon
            width={70}
            height={70}
            fill={theme.theme.colors.labelTertiary}
          />
          <Text
            style={{
              color: theme.theme.colors.labelPrimary,
              fontWeight: '700',
              fontSize: 26,
              textAlign: 'center',
            }}>
            Your bookmark list is empty
          </Text>
          <Text
            style={{
              color: theme.theme.colors.labelTertiary,
              fontWeight: '700',
              fontSize: 15,
              textAlign: 'center',
              marginVertical: 25,
            }}>
            Go Back to your feed and bookmark posts you.d like to keeo or read
            later. Each post you bookmark will be sored here.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              backgroundColor: theme.theme.colors.labelPrimary,
              padding: 15,
              borderRadius: 12,
            }}>
            <Text
              style={{
                color: theme.theme.colors.labelInvert,
                fontWeight: '700',
                fontSize: 15,
              }}>
              Go back to the feed
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Bookmarks;
