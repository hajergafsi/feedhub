import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Header} from '../../components';
import {ITheme, useTheme} from '../../contexts';
import HomesStyles from '../../styles/HomeStyles';
import FeedCard from '../../components/Home/FeedCard';
import {getSearchFeeds, useAppDispatch, useAppSelector} from '../../store';
import {shareMenuItems} from '../Home/Home';
import SearchIcon from '../../icons/Search';
import {EFeedCategory} from '../../common';
import {useAuth} from '../../hooks';

const LoadingComponent = () => {
  const {theme} = useTheme();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={theme.colors.labelTertiary} />
    </View>
  );
};

const Search = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const {auth} = useAuth();
  const {data} = useAppSelector(state => state.search);
  const {bookmarks} = useAppSelector(state => state.bookmarks);
  const [search, setSearch] = useState('');
  const isAuthenticated = !!auth?.tokens?.access.token;
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    auth
      ? dispatch(getSearchFeeds({token: auth.tokens.access.token}))
      : dispatch(getSearchFeeds({}));
  }, [auth, dispatch]);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  return (
    <View style={HomesStyles(theme).container}>
      <Header title="Search" navigation={navigation} />
      <ScrollView
        contentContainerStyle={[
          HomesStyles(theme).feedsContainer,
          {alignItems: 'center', paddingHorizontal: 25},
        ]}>
        <View style={searchStyles(theme).inputContainer}>
          <SearchIcon width={25} fill={theme.theme.colors.labelPrimary} />
          <TextInput
            onChangeText={(text: string) => setSearch(text)}
            value={search}
            placeholder={'Search'}
            onEndEditing={() => {
              dispatch(getSearchFeeds({search: search}));
              setLoading(true);
            }}
            placeholderTextColor={theme.theme.colors.labelSecondary}
            style={{
              color: theme.theme.colors.labelPrimary,
              fontSize: 16,
              width: '100%',
            }}
          />
        </View>
        {loading ? (
          <LoadingComponent />
        ) : (
          data?.map((item, i) => (
            <FeedCard
              key={i}
              index={i}
              feedCategory={EFeedCategory.SEARCH}
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
              id={item.id}
              shareMenuItems={shareMenuItems(
                theme.theme.colors.labelTertiary,
                navigation,
                item,
                bookmarks,
                isAuthenticated,
                dispatch,
                auth?.tokens.access.token,
              )}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Search;

export const searchStyles = (theme: ITheme) =>
  StyleSheet.create({
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
  });
