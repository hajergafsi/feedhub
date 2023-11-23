import React, {useEffect, useState} from 'react';
import {
  addToBookmarks,
  addUpvote,
  closeFeedModal,
  openFeedModal,
  openModal,
  removeFromBookmarks,
  removeUpvote,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomModal from '../Common/CustomModal';
import FeedModalHeader from './FeedModalHeader';
import {ITheme, useTheme} from '../../contexts';
import MostUpvoted from '../../icons/MostUpvoted';
import CommentIcon from '../../icons/Comment';
import BookmarkIcon from '../../icons/Bookmark';
import SharePost from '../../icons/SharePost';
import CopyIcon from '../../icons/CopyIcon';
import {useAuth} from '../../hooks';
import Share from 'react-native-share';
import CreateCommentModal from './CreateCommentModal';
import {getFeedById} from '../../store/thunks/feeds/getFeedById';
import Clipboard from '@react-native-clipboard/clipboard';

const FeedDetailsModal = ({
  withoutNavigation,
}: {
  withoutNavigation?: boolean;
}) => {
  const {isOpen, currentId, feedCategory, index, selectedFeed} = useAppSelector(
    state => state.feedModal,
  );

  const {bookmarks} = useAppSelector(state => state.bookmarks);
  const dispatch = useAppDispatch();
  const {auth} = useAuth();
  const theme = useTheme();
  const isAuthenticated = !!auth?.tokens?.access.token;
  const [commentModalOpen, setCommentModal] = useState<boolean>(false);

  const inBookmarks = () => {
    return bookmarks.find(item => item.id === currentId);
  };

  const shareContent = {
    title: selectedFeed?.title,
    message: 'Check this post: ',
    url: selectedFeed?.sourceURL,
    subject: 'Subject',
  };

  const handleShare = async () => {
    try {
      await Share.open(shareContent);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const copyToClipboard = async () => {
    if (selectedFeed) {
      Clipboard.setString(selectedFeed.sourceURL);
      Alert.alert('Copied to clipboard!');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getFeedById({id: currentId, token: auth.tokens.access.token}));
    }
  }, [auth?.tokens.access.token, currentId, dispatch, isAuthenticated]);
  const ModalBody = (
    <View style={{height: '96%'}}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 0,
        }}>
        <Text style={FeedModalStyles(theme).title}>{selectedFeed?.title}</Text>
        <Text style={FeedModalStyles(theme).caption}>
          {selectedFeed?.caption}
        </Text>
        <View style={FeedModalStyles(theme).tagContainer}>
          {selectedFeed?.tags?.map((item, i) => (
            <View key={i} style={FeedModalStyles(theme).tag}>
              <Text style={FeedModalStyles(theme).tagText}>#{item}</Text>
            </View>
          ))}
        </View>
        <Text style={FeedModalStyles(theme).date}>
          {new Date(selectedFeed?.createdAt || new Date()).toUTCString()}
        </Text>
        {selectedFeed?.thumbnail && (
          <Image
            style={FeedModalStyles(theme).postImage}
            source={{uri: selectedFeed.thumbnail}}
          />
        )}
        {selectedFeed?.upVotes?.length ? (
          <Text>{selectedFeed?.upVotes.length}upvote</Text>
        ) : null}
        <View style={FeedModalStyles(theme).buttonGroup}>
          <TouchableOpacity
            onPress={
              isAuthenticated
                ? () => {
                    if (selectedFeed) {
                      selectedFeed?.isUpVotedByUser
                        ? dispatch(
                            removeUpvote({
                              token: auth.tokens.access.token || '',
                              id: currentId,
                            }),
                          )
                        : dispatch(
                            addUpvote({
                              token: auth.tokens.access.token || '',
                              id: currentId,
                            }),
                          );
                    }
                  }
                : () => dispatch(openModal())
            }
            style={FeedModalStyles(theme).iconBtn}>
            <MostUpvoted
              width={25}
              stroke={
                selectedFeed?.isUpVotedByUser
                  ? 'transparent'
                  : theme.theme.colors.labelTertiary
              }
              fill={
                selectedFeed?.isUpVotedByUser
                  ? theme.theme.colors.colorAvocado
                  : 'transparent'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              isAuthenticated
                ? () => {
                    setCommentModal(true);
                  }
                : () => dispatch(openModal())
            }
            style={FeedModalStyles(theme).iconBtn}>
            <CommentIcon width={25} fill={theme.theme.colors.labelTertiary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              isAuthenticated
                ? () => {
                    if (selectedFeed) {
                      inBookmarks()
                        ? dispatch(
                            removeFromBookmarks({
                              token: auth.tokens.access.token || '',
                              id: currentId,
                            }),
                          )
                        : dispatch(
                            addToBookmarks({
                              token: auth.tokens.access.token || '',
                              bookmark: selectedFeed,
                            }),
                          );
                    }
                  }
                : () => dispatch(openModal())
            }
            style={FeedModalStyles(theme).iconBtn}>
            <BookmarkIcon
              width={25}
              fill={inBookmarks() ? theme.theme.colors.colorBun : 'transparent'}
              stroke={
                inBookmarks() ? 'transparent' : theme.theme.colors.labelTertiary
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleShare()}
            style={FeedModalStyles(theme).iconBtn}>
            <SharePost width={25} fill={theme.theme.colors.labelTertiary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={
            isAuthenticated
              ? () => {
                  setCommentModal(true);
                }
              : () => dispatch(openModal())
          }
          style={[
            FeedModalStyles(theme).buttonGroup,
            {alignItems: 'center', paddingHorizontal: 10},
          ]}>
          <Image
            style={FeedModalStyles(theme).profileCommentPic}
            source={{
              uri: auth?.user.avatar || 'https://i.stack.imgur.com/l60Hf.png',
            }}
          />
          <Text style={FeedModalStyles(theme).commentShare}>
            Share your thoughts
          </Text>
          <Text style={FeedModalStyles(theme).postBtn}>Post</Text>
        </TouchableOpacity>
        {selectedFeed?.comments?.length ? (
          <View>
            {selectedFeed?.comments.map((elem, i) => (
              <View key={i} style={FeedModalStyles(theme).commentContainer}>
                <View style={FeedModalStyles(theme).row}>
                  <Image
                    source={{uri: elem.user.avatar}}
                    style={FeedModalStyles(theme).commenterImage}
                  />
                  <View>
                    <Text style={FeedModalStyles(theme).commenterName}>
                      {elem.user.fullName}
                    </Text>
                    <Text style={FeedModalStyles(theme).commenterUsername}>
                      @{elem.user.username}
                      {'  '}.{'  '}
                      {new Date(elem.createdAt).toDateString()}
                    </Text>
                  </View>
                </View>
                <Text style={FeedModalStyles(theme).comment}>
                  {elem.content}
                </Text>
                <TouchableOpacity>
                  <CommentIcon
                    fill={theme.theme.colors.labelQuaternary}
                    width={28}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text style={FeedModalStyles(theme).noComment}>
            Be the first to comment.
          </Text>
        )}
        <View
          style={[
            FeedModalStyles(theme).buttonGroup,
            {
              height: 'auto',
              paddingHorizontal: 10,
              flexDirection: 'column',
            },
          ]}>
          <TouchableOpacity
            style={FeedModalStyles(theme).bottomBtn}
            onPress={() => copyToClipboard()}>
            <CopyIcon width={30} fill={theme.theme.colors.labelTertiary} />
            <Text style={{color: theme.theme.colors.labelTertiary}}>
              Copy link
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleShare()}
            style={FeedModalStyles(theme).bottomBtn}>
            <SharePost width={30} fill={theme.theme.colors.labelTertiary} />
            <Text style={{color: theme.theme.colors.labelTertiary}}>
              Share with your friends
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const setModalVisible = (state: boolean) => {
    dispatch(state ? openFeedModal() : closeFeedModal());
  };

  return (
    <View>
      <CreateCommentModal
        setModalVisible={setCommentModal}
        isOpen={commentModalOpen}
        feed={selectedFeed}
      />
      <CustomModal
        CustomHeader={
          <FeedModalHeader
            withNavigation={withoutNavigation === true ? false : true}
            index={index}
            feedCategory={feedCategory}
          />
        }
        modalVisible={isOpen}
        setModalVisible={setModalVisible}
        children={ModalBody}
      />
    </View>
  );
};

export default FeedDetailsModal;

const FeedModalStyles = (theme: ITheme) =>
  StyleSheet.create({
    title: {
      fontWeight: '700',
      fontSize: 30,
      lineHeight: 36,
      marginBottom: 10,
      color: theme.theme.colors.labelPrimary,
    },
    caption: {
      fontSize: 17,
      lineHeight: 22,
      marginBottom: 10,
      color: theme.theme.colors.labelSecondary,
      borderLeftWidth: 1,
      borderLeftColor: theme.theme.colors.colorCabbage,
      paddingLeft: 10,
    },
    tag: {
      borderRadius: 12,
      backgroundColor: theme.theme.colors.backgroundNotification,
      padding: 7,
    },
    tagText: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.theme.colors.labelTertiary,
    },
    tagContainer: {
      flexDirection: 'row',
      gap: 5,
    },
    date: {
      color: theme.theme.colors.labelTertiary,
      marginVertical: 5,
    },
    postImage: {
      height: 175,
      borderRadius: 15,
      marginTop: 10,
    },
    buttonGroup: {
      borderColor: theme.theme.colors.backgroundNotification,
      marginTop: 15,
      borderWidth: 1,
      height: 60,
      borderRadius: 13,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    iconBtn: {
      height: '100%',
      justifyContent: 'center',
      width: '25%',
      alignItems: 'center',
    },
    profileCommentPic: {
      width: 38,
      height: '67%',
      borderRadius: 12,
    },
    commentShare: {
      width: 140,
      color: theme.theme.colors.labelTertiary,
      fontSize: 15,
    },
    postBtn: {
      width: 60,
      backgroundColor: theme.theme.colors.backgroundReverse,
      color: theme.theme.colors.labelInvert,
      fontWeight: '700',
      height: 30,
      textAlign: 'center',
      verticalAlign: 'middle',
      borderRadius: 7,
    },
    noComment: {
      height: 130,
      verticalAlign: 'middle',
      textAlign: 'center',
      color: theme.theme.colors.labelQuaternary,
    },
    bottomBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      gap: 5,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    commentContainer: {
      padding: 10,
      borderColor: theme.theme.colors.active,
      borderRadius: 17,
      borderWidth: 1,
      marginVertical: 10,
    },
    commenterImage: {
      width: 40,
      height: 40,
      borderRadius: 10,
    },
    commenterName: {
      color: theme.theme.colors.labelPrimary,
      fontWeight: '700',
    },
    commenterUsername: {
      color: theme.theme.colors.labelQuaternary,
    },
    comment: {
      color: theme.theme.colors.labelPrimary,
      marginVertical: 10,
      fontSize: 16,
    },
  });
