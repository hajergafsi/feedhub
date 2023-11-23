import React, {useState} from 'react';
import CustomModal from '../Common/CustomModal';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  closeReportModal,
  openModal,
  openReportModal,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {ITheme, useTheme} from '../../contexts';
import {useAuth} from '../../hooks';
import {reportPost} from '../../store/thunks/report';

const reasons = ['broken link', 'clickbait', 'low quality', 'NSFW', 'other'];

const ReportPostModal = ({id, title}: {id: string; title: string}) => {
  const theme = useTheme();
  const {auth} = useAuth();
  const isAuthenticated = !!auth?.tokens?.access.token;
  const [reason, setReason] = useState<string>(reasons[0]);
  const [other, setOther] = useState<string>('');
  const {isOpen} = useAppSelector(state => state.reportModal);
  const dispatch = useAppDispatch();
  const ModalBody = (
    <View>
      <Text style={reportPostStyles(theme).headerButtonTextInactive}>
        {title}
      </Text>
      {reasons.map((item, i) => (
        <TouchableOpacity
          style={reportPostStyles(theme).option}
          onPress={() => setReason(item)}
          key={i}>
          <View
            style={[
              reportPostStyles(theme).radioBtnContainer,
              reason === item &&
                reportPostStyles(theme).radioBtnContainerSelected,
            ]}>
            <View
              style={[
                reportPostStyles(theme).radioBtn,
                reason === item
                  ? reportPostStyles(theme).radioBtnSelected
                  : null,
              ]}
            />
          </View>
          <Text style={reportPostStyles(theme).optionText}>
            {item.replace(/^\w/, c => c.toUpperCase())}
          </Text>
        </TouchableOpacity>
      ))}
      <Text style={reportPostStyles(theme).whatElse}>
        Anything else you'de like to add
      </Text>
      <TextInput
        onChangeText={text => setOther(text)}
        value={other}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor={theme.theme.colors.labelTertiary}
        style={reportPostStyles(theme).bioInput}
      />
    </View>
  );

  const Footer = (
    <View style={reportPostStyles(theme).footer}>
      <TouchableOpacity
        style={reportPostStyles(theme).postButton}
        onPress={() =>
          dispatch(
            isAuthenticated
              ? reportPost({
                  token: auth?.tokens.access.token,
                  reason: reason,
                  id: id,
                  details: other,
                })
              : openModal(),
          )
        }>
        <Text style={reportPostStyles(theme).postButtonText}>
          Submit report
        </Text>
      </TouchableOpacity>
    </View>
  );

  const setModalVisible = (state: boolean) => {
    state ? dispatch(openReportModal()) : dispatch(closeReportModal());
  };

  return (
    <View style={{flex: 1}}>
      <CustomModal
        modalVisible={isOpen}
        setModalVisible={setModalVisible}
        children={ModalBody}
        Header="Report Post"
        Footer={Footer}
      />
    </View>
  );
};

export default ReportPostModal;

const reportPostStyles = (theme: ITheme) =>
  StyleSheet.create({
    radioBtn: {
      width: 20,
      height: 20,
      borderColor: theme.theme.colors.labelTertiary,
      borderWidth: 2.5,
      borderRadius: 20,
    },
    radioBtnSelected: {
      backgroundColor: theme.theme.colors.checkedRadioBackground,
      borderWidth: 3.5,
      borderColor: theme.theme.colors.checkedRadioBorder,
      borderRadius: 20,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      gap: 15,
    },
    optionText: {
      color: theme.theme.colors.labelTertiary,
      fontWeight: '700',
    },
    radioBtnContainer: {
      justifyContent: 'center',
      padding: 6.5,
      borderRadius: 10,
    },
    radioBtnContainerSelected: {
      backgroundColor: theme.theme.colors.backgroundCabbageBlur,
    },
    row: {
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButtonTextInactive: {
      fontSize: 15,
      color: theme.theme.colors.labelTertiary,
      marginBottom: 35,
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
      backgroundColor: theme.theme.colors.backgroundReverse,
      paddingHorizontal: 15,
      borderRadius: 10,
    },
    postButtonText: {
      fontWeight: '700',
      color: theme.theme.colors.labelInvert,
    },
    bioInput: {
      color: theme.theme.colors.labelPrimary,
      backgroundColor: theme.theme.colors.backgroundSecondary,
      fontSize: 16,
      width: '100%',
      height: 'auto',
      textAlignVertical: 'top',
      marginTop: 10,
      borderRadius: 12,
    },
    whatElse: {
      marginTop: 40,
      color: theme.theme.colors.labelPrimary,
      fontWeight: '700',
      fontSize: 13,
    },
  });
