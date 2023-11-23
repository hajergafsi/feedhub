import {Header} from '../../components';
import FeedCard from '../../components/Home/FeedCard';
import {useTheme} from '../../contexts';
import {
  IFeed,
  addToBookmarks,
  openModal,
  removeFromBookmarks,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import HomesStyles from '../../styles/HomeStyles';
import React from 'react';
import {ScrollView, Text, View, Alert} from 'react-native';
import SharePost from '../../icons/SharePost';
import BookmarkIcon from '../../icons/Bookmark';
import LinkIcon from '../../icons/Link';
import Share from 'react-native-share';
import {EFeedCategory, EFilter, TDispatch, TMenuItem} from '../../common';
import CustomizationBox from '../../components/Home/CustomizationBox';
import {useAuth} from '../../hooks';
import ManageTagsButton from '../../components/Home/ManageTagsButton';
import ManageTagsModal from '../../components/Filters/ManageTagsModal';
import FeedDetailsModal from '../../components/Feeds/FeedDetailsModal';
import MostUpvotedHeader from '../../components/MostUpvoted/MostUpvotedHeader';
import Clipboard from '@react-native-clipboard/clipboard';

export function shareMenuItems(
  color: string,
  navigation: any,
  feed: IFeed,
  bookmarks: IFeed[],
  isAuthenticated: boolean,
  dispatch: TDispatch,
  token?: string,
) {
  const shareContent = {
    title: feed?.title,
    message: 'Check this post: ',
    url: feed?.sourceURL,
    subject: 'Subject',
  };

  const handleShare = async () => {
    try {
      await Share.open(shareContent);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleBookmark = () => {
    if (!isAuthenticated) dispatch(openModal());
    else {
      if (bookmarks.find(el => el.id === feed.id))
        dispatch(
          removeFromBookmarks({
            id: feed.id,
            token: token || '',
          }),
        );
      else
        dispatch(
          addToBookmarks({
            bookmark: feed,
            token: token || '',
          }),
        );
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setString(feed.sourceURL);
    Alert.alert('Copied to clipboard!');
  };

  const menus: TMenuItem[] = [
    {
      name: 'Share post via...',
      icon: <SharePost fill={color} />,
      onPress: () => handleShare(),
    },
    {
      name: `${
        bookmarks.find(item => item.id === feed.id)
          ? 'Remove from '
          : 'Save to '
      }bookmarks`,
      icon: (
        <BookmarkIcon
          fill={bookmarks?.find(item => item.id === feed.id) && color}
          stroke={color}
          width={25}
        />
      ),
      onPress: () => handleBookmark(),
    },
    {
      name: 'Copy link to post',
      icon: <LinkIcon fill={color} />,
      onPress: () => copyToClipboard(),
    },
  ];
  return menus;
}

const Home = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {data, filter} = useAppSelector(state => state.feeds);
  const {auth} = useAuth();
  const isAuthenticated = !!auth?.tokens?.access.token;
  const {bookmarks} = useAppSelector(state => state.bookmarks);
  return (
    <View style={HomesStyles(theme).container}>
      <Header title="FeedHub" navigation={navigation} />
      {filter === EFilter.MOST_UPVOTED && <MostUpvotedHeader />}
      {filter === EFilter.POPULAR && (
        <Text
          style={{
            fontSize: 17,
            marginTop: 25,
            marginLeft: 25,
            paddingBottom: 15,
            fontWeight: '700',
            color: theme.theme.colors.labelPrimary,
          }}>
          Popular
        </Text>
      )}
      <ScrollView contentContainerStyle={HomesStyles(theme).feedsContainer}>
        <ManageTagsModal />
        <FeedDetailsModal />
        {filter ? null : isAuthenticated ? (
          <ManageTagsButton />
        ) : (
          <CustomizationBox />
        )}
        {data?.map((item, i) => (
          <FeedCard
            key={i}
            title={item.title}
            caption={item.caption}
            thumbnail={item.thumbnail}
            sourceName={item.sourceName}
            sourceLogo={item.sourceLogo}
            isUpVotedByUser={item.isUpVotedByUser}
            sourceURL={item.sourceURL}
            upVotes={item.upVotes}
            comments={item.comments}
            tags={item.tags}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
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
            feedCategory={EFeedCategory.FEED}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
