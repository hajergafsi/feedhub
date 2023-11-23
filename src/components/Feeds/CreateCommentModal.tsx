import React, {useState} from 'react';
import CustomModal from '../Common/CustomModal';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {IFeed, createComment, useAppDispatch} from '../../store';
import {ITheme, useTheme} from '../../contexts';
import ExitIcon from '../../icons/Exit';
import {useAuth} from '../../hooks';

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  feed: IFeed | null;
};

const CreateCommentModal = ({setModalVisible, isOpen, feed}: Props) => {
  const theme = useTheme();
  const {auth} = useAuth();
  const [comment, setComment] = useState<string>('');
  const dispatch = useAppDispatch();
  const ModalBody = (
    <View>
      <View
        style={[
          createCommentStyles(theme).row,
          {height: 45, gap: 10, marginBottom: 10},
        ]}>
        {feed && (
          <Image
            style={createCommentStyles(theme).logo}
            source={{uri: feed.sourceLogo}}
          />
        )}
        <View style={{gap: 5}}>
          <Text style={{color: theme.theme.colors.labelPrimary}}>
            {feed?.sourceName}
          </Text>
          <Text style={{color: theme.theme.colors.labelQuaternary}}>
            {new Date(feed?.createdAt || '').toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Text style={{color: theme.theme.colors.labelPrimary}}>
        {feed?.title}
      </Text>
      <Text style={createCommentStyles(theme).replySection}>
        Reply to <Text style={{fontWeight: '700'}}>{feed?.sourceName}</Text>
      </Text>
      <View style={[createCommentStyles(theme).row, {height: 'auto', gap: 10}]}>
        {auth?.user.avatar && (
          <Image
            source={{uri: auth.user.avatar}}
            style={createCommentStyles(theme).userProfile}
          />
        )}
        <TextInput
          onChangeText={text => setComment(text)}
          value={comment}
          placeholder="Share your thoughts"
          style={{color: theme.theme.colors.labelSecondary}}
          placeholderTextColor={theme.theme.colors.labelQuaternary}
        />
      </View>
    </View>
  );

  const Footer = (
    <View style={createCommentStyles(theme).footer}>
      <TouchableOpacity
        style={createCommentStyles(theme).postButton}
        onPress={() => {
          dispatch(
            createComment({
              id: feed?.id || '',
              comment: comment,
              token: auth?.tokens.access.token || '',
            }),
          );
          setComment('');
          setModalVisible(false);
        }}>
        <Text style={createCommentStyles(theme).postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );

  const customHeader = (
    <View style={createCommentStyles(theme).header}>
      <View style={createCommentStyles(theme).row}>
        <TouchableOpacity style={createCommentStyles(theme).headerButton}>
          <Text style={createCommentStyles(theme).headerButtonText}>Write</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            createCommentStyles(theme).headerButton,
            {backgroundColor: 'transparent'},
          ]}>
          <Text style={createCommentStyles(theme).headerButtonTextInactive}>
            Preview
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <ExitIcon fill={theme.theme.colors.labelTertiary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <CustomModal
        modalVisible={isOpen}
        setModalVisible={setModalVisible}
        children={ModalBody}
        CustomHeader={customHeader}
        Footer={Footer}
      />
    </View>
  );
};

export default CreateCommentModal;

const createCommentStyles = (theme: ITheme) =>
  StyleSheet.create({
    header: {
      height: 60,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.theme.colors.labelQuaternary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
    },
    row: {
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButton: {
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.theme.colors.active,
      paddingHorizontal: 13,
      borderRadius: 10,
    },
    headerButtonText: {
      fontWeight: '700',
      fontSize: 15,
      color: theme.theme.colors.labelPrimary,
    },
    headerButtonTextInactive: {
      fontSize: 15,
      color: theme.theme.colors.labelTertiary,
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 10,
    },
    replySection: {
      color: theme.theme.colors.labelSecondary,
      height: 55,
      verticalAlign: 'middle',
      borderLeftWidth: 1,
      borderLeftColor: theme.theme.colors.active,
      marginLeft: 15,
      paddingLeft: 15,
    },
    userProfile: {
      height: 30,
      width: 30,
      borderRadius: 10,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '100%',
      width: '100%',
      paddingHorizontal: '7%',
    },
    postButton: {
      height: 35,
      justifyContent: 'center',
      backgroundColor: theme.theme.colors.colorAvocado,
      paddingHorizontal: 15,
      borderRadius: 10,
    },
    postButtonText: {
      fontWeight: '700',
      color: theme.theme.colors.labelInvert,
    },
  });
