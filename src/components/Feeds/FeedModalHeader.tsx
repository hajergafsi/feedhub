import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import {ITheme, useTheme} from '../../contexts';
import RightArrowIcon from '../../icons/RightArrow';
import ExitIcon from '../../icons/Exit';
import {
  IFeed,
  closeFeedModal,
  createReadingActivity,
  getProfile,
  setSelectedFeed,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {extendMenuItems} from '../Home/FeedCard';
import ShareIcon from '../../icons/ShareIcon';
import ThreePoints from '../../icons/ThreePoints';
import {useAuth} from '../../hooks';
import {EFeedCategory} from '../../common';
import {getFeedById} from '../../store/thunks/feeds/getFeedById';
import CustomTooltip from '../Common/CustomTooltip';
import TootltipContent from '../Common/TootltipContent';

type Props = {
  index: number;
  feedCategory: EFeedCategory;
  withNavigation: boolean;
};

const FeedModalHeader = (props: Props) => {
  const {selectedFeed} = useAppSelector(state => state.feedModal);
  const {bookmarks} = useAppSelector(state => state.bookmarks);
  const [ExtendModal, setExtendModal] = useState<boolean>(false);
  const {blockedSources, blockedTags} = useAppSelector(
    state => state.blockedItems,
  );
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {auth} = useAuth();
  const isAuthenticated = !!auth?.tokens?.access.token;
  const closeModal = () => {
    dispatch(closeFeedModal());
  };
  const data = useAppSelector(state =>
    props.feedCategory === EFeedCategory.FEED
      ? state.feeds.data
      : props.feedCategory === EFeedCategory.BOOKMARKS
      ? state.bookmarks.bookmarks
      : state.search.data,
  );

  const changeFeed = (id: string, index: number) => {
    dispatch(
      isAuthenticated
        ? getFeedById({id: id, token: auth?.tokens.access.token})
        : getFeedById({id: id}),
    );
    dispatch(
      setSelectedFeed({
        ...data[index],
        index: index,
        category: props.feedCategory,
      }),
    );
  };

  return (
    <View
      style={[headStyles(theme).container, {justifyContent: 'space-between'}]}>
      {props.withNavigation ? (
        <View style={headStyles(theme).container}>
          <TouchableOpacity
            disabled={props.index === 0}
            onPress={() =>
              changeFeed(data[props.index - 1].id, props.index - 1)
            }
            style={[
              headStyles(theme).arrowBtn,
              headStyles(theme).rotateRight,
              props.index === 0 && {
                borderColor: theme.theme.colors.labelDisabled,
              },
            ]}>
            <RightArrowIcon
              fill={
                props.index === 0
                  ? theme.theme.colors.labelDisabled
                  : theme.theme.colors.labelPrimary
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={props.index === data.length - 1}
            onPress={() =>
              changeFeed(data[props.index + 1].id, props.index + 1)
            }
            style={[
              headStyles(theme).arrowBtn,
              headStyles(theme).rotateLeft,
              props.index === data.length - 1 && {
                borderColor: theme.theme.colors.labelDisabled,
              },
            ]}>
            <RightArrowIcon
              fill={
                props.index === data.length - 1
                  ? theme.theme.colors.labelDisabled
                  : theme.theme.colors.labelPrimary
              }
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={headStyles(theme).container} />
      )}
      <View style={[headStyles(theme).container, {gap: 10}]}>
        <TouchableOpacity
          onPress={() => {
            if (auth?.tokens.access.token && selectedFeed) {
              dispatch(
                createReadingActivity({
                  token: auth.tokens.access.token,
                  id: selectedFeed.id,
                }),
              );
              dispatch(getProfile(auth?.tokens.access.token));
            }

            Linking.openURL(selectedFeed?.sourceURL || '');
          }}>
          <ShareIcon fill={theme.theme.colors.labelTertiary} />
        </TouchableOpacity>
        <CustomTooltip
          content={
            <TootltipContent
              items={extendMenuItems(
                theme.theme.colors.labelTertiary,
                selectedFeed?.sourceName || '',
                selectedFeed?.tags || [],
                selectedFeed as IFeed,
                dispatch,
                bookmarks,
                auth?.tokens.access.token || '',
                selectedFeed?.id || '',
                selectedFeed?.title || '',
                isAuthenticated,
                blockedTags,
                blockedSources,
              )}
              extraStyling={{width: '100%', top: 'auto'}}
            />
          }
          setVisible={setExtendModal}
          tooltipVisible={ExtendModal}
          buttonStyle={headStyles(theme).row}
          buttonContent={
            <ThreePoints fill={theme.theme.colors.labelTertiary} />
          }
          placement={'bottom'}
        />
        <TouchableOpacity onPress={() => closeModal()}>
          <ExitIcon fill={theme.theme.colors.labelTertiary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedModalHeader;

const headStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 65,

      paddingTop: 10,
      paddingHorizontal: 10,
    },
    arrowBtn: {
      height: 40,
      width: 40,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: theme.theme.colors.labelPrimary,
      marginRight: 5,
    },
    rotateLeft: {
      transform: [{rotate: '90deg'}],
    },
    rotateRight: {
      transform: [{rotate: '-90deg'}],
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%',
    },
  });
