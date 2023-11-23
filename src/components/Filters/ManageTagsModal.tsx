import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomModal from '../Common/CustomModal';
import {
  closeTagsModal,
  openTagsModal,
  updateUser,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {ITheme, useTheme} from '../../contexts';
import RightArrowIcon from '../../icons/RightArrow';
import {searchStyles} from '../../screens/Search/Search';
import SearchIcon from '../../icons/Search';
import {useAuth} from '../../hooks';

const ManageTagsModal = () => {
  const {isOpen} = useAppSelector(state => state.manageTags);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const {auth} = useAuth();

  const {data} = useAppSelector(state => state.topics);

  const isFollowed = (tag: string) => {
    return auth?.user.tags?.find(item => item === tag);
  };

  const setModalVisible = (state: boolean) => {
    dispatch(state ? openTagsModal() : closeTagsModal());
  };

  const toggleTag = (tag: string) => {
    const updated = isFollowed(tag)
      ? [...(auth?.user.tags || [])].filter(item => item !== tag)
      : [...(auth?.user.tags || []), tag];
    return updated;
  };

  const updateTags = (tag: string) => {
    dispatch(
      updateUser({
        id: auth?.user.id || '',
        credentials: {tags: toggleTag(tag)},
        token: auth?.tokens.access.token || '',
      }),
    );
  };

  const ModalBody = (
    <ScrollView contentContainerStyle={{paddingBottom: 10}}>
      <View style={[searchStyles(theme).inputContainer, {marginTop: 0}]}>
        <SearchIcon width={25} fill={theme.theme.colors.labelPrimary} />
        <TextInput
          onChangeText={(text: string) => setSearch(text)}
          value={search}
          placeholder={'Search'}
          placeholderTextColor={theme.theme.colors.labelSecondary}
          style={{
            color: theme.theme.colors.labelPrimary,
            fontSize: 16,
            width: '100%',
          }}
        />
      </View>
      <Text style={ManageTagsStyles(theme).title}>Choose topics to follow</Text>
      <Text style={ManageTagsStyles(theme).description}>
        Let’s super-charge your feed with relevant content! Start by choosing
        topics you want to follow, and we will curate your feed accordingly.
      </Text>
      {data.map((item, i) => (
        <View key={i} style={ManageTagsStyles(theme).topicBox}>
          <Text style={ManageTagsStyles(theme).topic}>
            {item.replace(/^\w/, c => c.toUpperCase())}
          </Text>
          <TouchableOpacity
            onPress={() => updateTags(item)}
            style={[
              ManageTagsStyles(theme).followBtn,
              isFollowed(item) ? ManageTagsStyles(theme).followBtnActive : null,
            ]}>
            <Text
              style={[
                ManageTagsStyles(theme).followBtnText,
                isFollowed(item)
                  ? ManageTagsStyles(theme).followBtnActiveText
                  : null,
              ]}>
              {isFollowed(item) ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const goBackButton = (
    <TouchableOpacity
      onPress={() => {
        dispatch(closeTagsModal());
      }}
      style={[
        ManageTagsStyles(theme).sumbitBtn,
        ManageTagsStyles(theme).rotateInverse,
      ]}>
      <RightArrowIcon fill={theme.theme.colors.labelTertiary} />
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <CustomModal
        modalVisible={isOpen}
        setModalVisible={setModalVisible}
        children={ModalBody}
        Header={'Manage tags'}
        HeaderLeft={goBackButton}
      />
    </View>
  );
};

export default ManageTagsModal;

const ManageTagsStyles = (theme: ITheme) =>
  StyleSheet.create({
    sumbitBtn: {
      width: 30,
      height: 30,
      backgroundColor: theme.theme.colors.active,
      borderRadius: 8,
      transform: [{rotate: '90deg'}],
    },
    rotateInverse: {
      transform: [{rotate: '-90deg'}],
    },
    title: {
      fontWeight: '700',
      color: theme.theme.colors.labelPrimary,
      fontSize: 20,
      marginBottom: 10,
    },
    description: {
      color: theme.theme.colors.labelTertiary,
      fontSize: 15,
      marginBottom: 10,
    },
    topicBox: {
      height: 60,
      backgroundColor: theme.theme.colors.dividerTertiary,
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 14,
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    topic: {
      fontWeight: '700',
      color: theme.theme.colors.labelPrimary,
      fontSize: 15,
    },
    followBtn: {
      borderRadius: 10,
      backgroundColor: theme.theme.colors.backgroundReverse,
      padding: 7,
      paddingHorizontal: 15,
    },
    followBtnText: {
      color: theme.theme.colors.labelInvert,
      fontWeight: '700',
      fontSize: 15,
    },
    followBtnActive: {
      backgroundColor: 'transparent',
      borderColor: theme.theme.colors.backgroundReverse,
      borderWidth: 1,
    },
    followBtnActiveText: {
      color: theme.theme.colors.backgroundReverse,
    },
  });
