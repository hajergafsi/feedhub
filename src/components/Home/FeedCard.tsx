import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  IBlock,
  IFeed,
  addToBookmarks,
  addUpvote,
  blockSource,
  blockTag,
  createReadingActivity,
  getProfile,
  getReadingHistory,
  hideFeed,
  openFeedModal,
  openModal,
  openReportModal,
  removeFromBookmarks,
  removeUpvote,
  setSelectedFeed,
  unblockItem,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {ITheme, useTheme} from '../../contexts';
import ShareIcon from '../../icons/ShareIcon';
import ThreePoints from '../../icons/ThreePoints';
import MostUpvoted from '../../icons/MostUpvoted';
import CommentSvg from '../../icons/Comment';
import SharePost from '../../icons/SharePost';
import {EFeedCategory, TMenuItem} from '../../common';
import BookmarkIcon from '../../icons/Bookmark';
import EyeIcon from '../../icons/Eye';
import BlockIcon from '../../icons/BlockIcon';
import FlagIcon from '../../icons/FlagIcon';
import {AnyAction, Dispatch, ThunkDispatch} from '@reduxjs/toolkit';
import {useAuth} from '../../hooks';
import {getFeedById} from '../../store/thunks/feeds/getFeedById';
import ReportPostModal from '../Feeds/ReportPostModal';
import CreateCommentModal from '../Feeds/CreateCommentModal';
import CustomTooltip from '../Common/CustomTooltip';
import TootltipContent from '../Common/TootltipContent';

const isBlocked = (arr: IBlock[], element: string) => {
  return arr.find(item => item.value === element);
};

export function extendMenuItems(
  color: string,
  source: string,
  Tags: string[],
  bookmark: IFeed,
  dispatch: TDispatch,
  bookmarks: IFeed[],
  token: string,
  id: string,
  title: string,
  isAuthenticated: boolean,
  blockedTags: IBlock[],
  blockedSources: IBlock[],
) {
  const menus: TMenuItem[] = [
    {
      name: 'Hide',
      icon: <EyeIcon fill={color} />,
      onPress: () => {
        dispatch(hideFeed(bookmark.id));
      },
    },
    {
      name: `${
        bookmarks?.find(item => item.id === bookmark.id)
          ? 'Remove from '
          : 'Save to '
      }bookmarks`,
      icon: (
        <BookmarkIcon
          fill={bookmarks?.find(item => item.id === bookmark.id) && color}
          stroke={color}
          width={30}
        />
      ),
      onPress: () => {
        if (!isAuthenticated) {
          dispatch(openModal());
        } else {
          bookmarks?.find(item => item.id === bookmark.id)
            ? dispatch(removeFromBookmarks({id: bookmark.id, token: token}))
            : dispatch(addToBookmarks({bookmark: bookmark, token: token}));
        }
      },
    },
    {
      name: `Don\'t show posts from ${source}`,
      icon: <BlockIcon fill={color} />,
      onPress: () => {
        const src = isBlocked(blockedSources, source);
        if (!isAuthenticated) dispatch(openModal());
        else if (src) {
          dispatch(
            unblockItem({
              id: src.id,
              token: token,
            }),
          );
        } else dispatch(blockSource({token: token, source: source}));
      },
    },
  ];
  Tags.forEach(item => {
    menus.push({
      name: `Not interested in #${item}`,
      icon: <BlockIcon fill={color} />,
      onPress: () => {
        const tag = isBlocked(blockedTags, item);
        if (!isAuthenticated) dispatch(openModal());
        else if (tag) {
          dispatch(
            unblockItem({
              id: tag.id,
              token: token,
            }),
          );
        } else dispatch(blockTag({token: token, tag: item}));
      },
    });
  });
  menus.push({
    name: 'Report',
    icon: <FlagIcon fill={color} />,
    onPress: () => {
      dispatch(openReportModal());
      /*  dispatch(setPostDetails({id: id, title: title})); */
    },
  });
  return menus;
}

const FeedCard = (
  props: IFeed & {
    shareMenuItems: TMenuItem[];
    feedCategory: EFeedCategory;
    index: number;
  },
) => {
  const theme = useTheme();
  const {auth} = useAuth();
  const isAuthenticated = !!auth?.tokens?.access.token;
  const dispatch = useAppDispatch();
  const {bookmarks} = useAppSelector(state => state.bookmarks);
  const {blockedSources, blockedTags} = useAppSelector(
    state => state.blockedItems,
  );
  const [shareModal, setShareModal] = useState<boolean>(false);
  const [ExtendModal, setExtendModal] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState<boolean>(false);

  const openFeed = () => {
    dispatch(openFeedModal());
    dispatch(
      setSelectedFeed({
        id: props.id,
        index: props.index,
        category: props.feedCategory,
      }),
    );
    dispatch(
      isAuthenticated
        ? getFeedById({id: props.id, token: auth.tokens.access.token})
        : getFeedById({id: props.id}),
    );
  };

  return (
    <TouchableOpacity onPress={openFeed} style={cardStyles(theme).card}>
      <ReportPostModal id={props.id} title={props.title} />
      <CreateCommentModal
        setModalVisible={setCommentModal}
        isOpen={commentModal}
        feed={props}
      />

      <View style={cardStyles(theme).cardHeader}>
        {props.sourceLogo && (
          <Image
            style={cardStyles(theme).souceLogo}
            source={{uri: props.sourceLogo}}
          />
        )}
        <View style={cardStyles(theme).row}>
          <TouchableOpacity
            onPress={() => {
              if (auth?.tokens.access.token) {
                dispatch(
                  createReadingActivity({
                    token: auth?.tokens.access.token,
                    id: props.id,
                  }),
                );
                dispatch(getProfile(auth?.tokens.access.token));
                setTimeout(() => {
                  dispatch(
                    getReadingHistory({token: auth?.tokens.access.token}),
                  );
                }, 5000);
              }

              Linking.openURL(props.sourceURL);
            }}
            style={[cardStyles(theme).row, cardStyles(theme).readMoreBtn]}>
            <Text style={cardStyles(theme).readMoreBtnText}>Read Post</Text>
            <ShareIcon
              fill={theme.theme.colors.labelInvert}
              width={25}
              height={25}
            />
          </TouchableOpacity>
          <CustomTooltip
            content={
              <TootltipContent
                items={extendMenuItems(
                  theme.theme.colors.labelTertiary,
                  props.sourceName,
                  props.tags,
                  props as IFeed,
                  dispatch,
                  bookmarks,
                  auth?.tokens.access.token || '',
                  props.id,
                  props?.title,
                  isAuthenticated,
                  blockedTags,
                  blockedSources,
                )}
                extraStyling={{width: '100%', top: 'auto'}}
              />
            }
            setVisible={setExtendModal}
            tooltipVisible={ExtendModal}
            buttonStyle={cardStyles(theme).row}
            buttonContent={
              <ThreePoints fill={theme.theme.colors.labelTertiary} />
            }
            placement={'bottom'}
          />
          {/* <TouchableOpacity onPress={() => setExtendModal(true)}>
            <ThreePoints fill={theme.theme.colors.labelTertiary} />
          </TouchableOpacity> */}
        </View>
      </View>
      <Text style={cardStyles(theme).cardTitle}>{props.title}</Text>
      <Text style={cardStyles(theme).cardDescription}>
        {new Date(props.createdAt).toUTCString()}
      </Text>
      {props.thumbnail && (
        <Image
          style={cardStyles(theme).postImage}
          source={{uri: props.thumbnail}}
        />
      )}
      <View
        style={[
          cardStyles(theme).row,
          {height: 35, justifyContent: 'space-between', marginTop: 25},
        ]}>
        <TouchableOpacity
          onPress={
            isAuthenticated
              ? () => {
                  props.isUpVotedByUser
                    ? dispatch(
                        removeUpvote({
                          token: auth.tokens.access.token || '',
                          id: props.id,
                        }),
                      )
                    : dispatch(
                        addUpvote({
                          token: auth.tokens.access.token || '',
                          id: props.id,
                        }),
                      );
                }
              : () => dispatch(openModal())
          }
          style={cardStyles(theme).row}>
          <MostUpvoted
            stroke={
              props.isUpVotedByUser
                ? 'transparent'
                : theme.theme.colors.labelTertiary
            }
            fill={
              props.isUpVotedByUser
                ? theme.theme.colors.colorAvocado
                : 'transparent'
            }
            width={30}
          />
          <Text style={cardStyles(theme).cardFooter}>
            {props.upVotes.length || ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={cardStyles(theme).row}
          onPress={
            isAuthenticated
              ? () => {
                  setCommentModal(true);
                }
              : () => dispatch(openModal())
          }>
          <CommentSvg fill={theme.theme.colors.labelTertiary} width={30} />
          <Text style={cardStyles(theme).cardFooter}>
            {props.comments.length || ''}
          </Text>
        </TouchableOpacity>
        <CustomTooltip
          content={
            <TootltipContent
              extraStyling={{top: 'auto', width: 168}}
              items={props.shareMenuItems}
            />
          }
          setVisible={setShareModal}
          tooltipVisible={shareModal}
          buttonStyle={cardStyles(theme).row}
          buttonContent={
            <SharePost fill={theme.theme.colors.labelTertiary} width={30} />
          }
          placement={'top'}
        />
        {/* <TouchableOpacity
          style={cardStyles(theme).row}
          onPress={() => setShareModal(true)}>
          <SharePost fill={theme.theme.colors.labelTertiary} width={30} />
        </TouchableOpacity> */}

        {/* <TinyModal
          isModalOpen={shareModal}
          setModal={setShareModal}
          theme={theme}
          menus={props.shareMenuItems}
        /> */}
        {/* <TinyModal
          isModalOpen={ExtendModal}
          setModal={setExtendModal}
          theme={theme}
          menus={extendMenuItems(
            theme.theme.colors.labelTertiary,
            props.sourceName,
            props.tags,
            props as IFeed,
            dispatch,
            bookmarks,
            auth?.tokens.access.token || '',
            props.id,
            props?.title,
            isAuthenticated,
            blockedTags,
            blockedSources,
          )}
          extraStyling={{width: '95%'}}
        /> */}
      </View>
    </TouchableOpacity>
  );
};

export default FeedCard;

const cardStyles = (theme: ITheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.theme.colors.backgroundSecondary,
      marginBottom: 15,
      borderColor: theme.theme.colors.dividerTertiary,
      borderWidth: 1,
      borderRadius: 16,
      padding: 10,
      width: '100%',
    },
    cardTitle: {
      color: theme.theme.colors.labelPrimary,
      fontSize: 20,
      textAlign: 'justify',
      fontWeight: '700',
    },
    cardDescription: {
      color: theme.theme.colors.labelTertiary,
      fontSize: 13,
      marginTop: 10,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    souceLogo: {
      width: 35,
      height: 35,
      borderRadius: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%',
    },
    readMoreBtn: {
      paddingHorizontal: 12,
      borderRadius: 10,
      height: 37,
      backgroundColor: theme.theme.colors.labelPrimary,
      gap: 10,
    },
    readMoreBtnText: {
      color: theme.theme.colors.labelInvert,
      fontSize: 15,
      fontWeight: '700',
    },
    postImage: {
      height: 195,
      borderRadius: 15,
      marginTop: 10,
    },
    cardFooter: {
      color: theme.theme.colors.labelTertiary,
      fontWeight: '700',
      fontSize: 15,
    },
  });

type TDispatch = ThunkDispatch<any, undefined, AnyAction> & Dispatch<AnyAction>;
