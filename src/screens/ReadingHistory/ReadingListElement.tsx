import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {historyStyles} from './ReadingHistory';
import {useTheme} from '../../contexts';
import ThreePoints from '../../icons/ThreePoints';
import CustomTooltip from '../../components/Common/CustomTooltip';
import TootltipContent from '../../components/Common/TootltipContent';
import SharePost from '../../icons/SharePost';
import {EFeedCategory, TMenuItem} from '../../common';
import BookmarkIcon from '../../icons/Bookmark';
import ExitIcon from '../../icons/Exit';
import {
  addToBookmarks,
  openFeedModal,
  removeFromBookmarks,
  removeFromHistory,
  setSelectedFeed,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {useAuth} from '../../hooks';
import {getFeedById} from '../../store/thunks/feeds/getFeedById';

type Props = {
  item: string;
};

const ReadingListElement = ({item}: Props) => {
  const theme = useTheme();
  const [shareModal, setShareModal] = useState<boolean>(false);
  const {bookmarks} = useAppSelector(state => state.bookmarks);
  const disptach = useAppDispatch();
  const {auth} = useAuth();
  const isAuthenticated = !!auth?.tokens?.access.token;

  const handlePress = () => {
    disptach(openFeedModal());
    disptach(
      setSelectedFeed({
        id: JSON.parse(item).feed.id,
        index: 0,
        category: EFeedCategory.FEED,
      }),
    );
    disptach(
      isAuthenticated
        ? getFeedById({
            id: JSON.parse(item).feed.id,
            token: auth.tokens.access.token,
          })
        : getFeedById({id: JSON.parse(item).feed.id}),
    );
  };

  const menus: TMenuItem[] = [
    {
      name: 'Share post via...',
      icon: <SharePost width={22} fill={theme.theme.colors.labelTertiary} />,
    },
    {
      name: 'Save to bookmarks',
      icon: (
        <BookmarkIcon
          width={20}
          stroke={
            bookmarks.find(el => el.id === JSON.parse(item).feed.id)
              ? 'transparent'
              : theme.theme.colors.labelTertiary
          }
          fill={
            bookmarks.find(el => el.id === JSON.parse(item).feed.id)
              ? theme.theme.colors.labelTertiary
              : 'transparent'
          }
        />
      ),
      onPress: () =>
        bookmarks.find(el => el.id === JSON.parse(item).feed.id)
          ? disptach(
              removeFromBookmarks({
                id: JSON.parse(item).feed.id,
                token: auth?.tokens.access.token || '',
              }),
            )
          : disptach(
              addToBookmarks({
                bookmark: JSON.parse(item).feed,
                token: auth?.tokens.access.token || '',
              }),
            ),
    },
    {
      name: 'Remove post',
      icon: <ExitIcon width={20} fill={theme.theme.colors.labelTertiary} />,
      onPress: () => disptach(removeFromHistory(JSON.parse(item).feed.id)),
    },
  ];
  return (
    <TouchableOpacity style={{height: 150}} onPress={handlePress}>
      <View style={historyStyles(theme).postContainer}>
        <View style={historyStyles(theme).imageCollage}>
          {JSON.parse(item).feed.sourceLogo && (
            <Image
              source={{uri: JSON.parse(item).feed.sourceLogo}}
              style={historyStyles(theme).postLogo}
            />
          )}
          {JSON.parse(item).feed.thumbnail && (
            <Image
              source={{uri: JSON.parse(item).feed.thumbnail}}
              style={historyStyles(theme).postThumbnail}
            />
          )}
        </View>
        <Text
          style={{
            width: '65%',
            color: theme.theme.colors.labelPrimary,
            lineHeight: 20,
          }}>
          {JSON.parse(item).feed.title}
        </Text>
        <CustomTooltip
          content={
            <TootltipContent
              extraStyling={{top: 'auto', width: '100%'}}
              items={menus}
            />
          }
          setVisible={setShareModal}
          tooltipVisible={shareModal}
          buttonStyle={[historyStyles(theme).row, {height: 35}]}
          buttonContent={
            <ThreePoints
              width={25}
              height={25}
              fill={theme.theme.colors.labelQuaternary}
            />
          }
          placement={'bottom'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ReadingListElement;
