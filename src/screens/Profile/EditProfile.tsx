import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {Header} from '../../components';
import {ITheme, useTheme} from '../../contexts';
import RightArrowIcon from '../../icons/RightArrow';
import HomesStyles from '../../styles/HomeStyles';
import ProfileStyles from '../../styles/ProfileStyles';
import {
  CameraType,
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {btnStyles} from '../../components/Login/SignInBtn';
import {Formik, FormikProps} from 'formik';
import UserIcon from '../../icons/UserIcon';
import AtIcon from '../../icons/AtIcon';
import GithubIcon from '../../icons/Github';
import LinkIcon from '../../icons/Link';
import LinkedInIcon from '../../icons/LinkedIn';
import {useAuth} from '../../hooks';
import {
  useAppDispatch,
  useAppSelector,
  addMedia,
  updateUser,
  clearMedia,
} from '../../store';

const filterValues = (values: {
  fullName?: string;
  bio?: string;
  company?: string;
  jobTitle?: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  avatar?: string;
}) => {
  let newValues = {};
  if (values.fullName) newValues = {...newValues, fullName: values.fullName};
  if (values.bio) newValues = {...newValues, bio: values.bio};
  if (values.company) newValues = {...newValues, company: values.company};
  if (values.jobTitle) newValues = {...newValues, jobTitle: values.jobTitle};
  if (values.linkedIn) newValues = {...newValues, linkedIn: values.linkedIn};
  if (values.github) newValues = {...newValues, github: values.github};
  if (values.website) newValues = {...newValues, website: values.website};
  if (values.avatar) newValues = {...newValues, avatar: values.avatar};

  return newValues;
};

const SelectImageOption = ({
  setSelectedImage,
  setModalVisible,
  modalVisible,
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
}) => {
  const {auth} = useAuth();
  const dispatch = useAppDispatch();
  const handleCameraPress = () => {
    const options = {
      cameraType: 'front' as CameraType,
      mediaType: 'photo' as MediaType,
    };
    launchCamera(options, response => {
      if (response.assets) {
        setSelectedImage(response.assets[0].uri);
        handleFileUpload(
          response.assets[0].uri || '',
          response.assets[0].type || '',
          response.assets[0].fileName || '',
        );
        setModalVisible(false);
      }
    });
  };

  const theme = useTheme();
  const handleGalleryPress = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo' as MediaType,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        setSelectedImage(response.assets[0].uri);
        handleFileUpload(
          response.assets[0].uri || '',
          response.assets[0].type || '',
          response.assets[0].fileName || '',
        );
        setModalVisible(false);
      }
    });
  };

  const handleFileUpload = async (uri: string, type: string, name: string) => {
    try {
      const formData = new FormData();
      formData.append('images', {
        uri: uri,
        type: type,
        name: name,
      });

      dispatch(
        addMedia({
          body: formData,
          token: auth?.tokens?.access.token || '',
        }),
      );
      //const result = await response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal transparent={true} visible={modalVisible}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            flex: 0.2,
            borderTopStartRadius: 25,
            borderTopEndRadius: 25,
            justifyContent: 'flex-end',
            width: '100%',
            alignItems: 'flex-end',
            backgroundColor: theme.theme.colors.backgroundTertiary,
          }}>
          <TouchableOpacity
            onPress={handleCameraPress}
            style={styles(theme).modalOption}>
            <Text style={styles(theme).modalText}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGalleryPress}
            style={styles(theme).modalOption}>
            <Text style={styles(theme).modalText}>Choose from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles(theme).modalOption}>
            <Text style={styles(theme).modalText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const EditProfile = ({navigation}: {navigation: any}) => {
  const {data} = useAppSelector(state => state.storage);
  const dispatch = useAppDispatch();
  const formRef = useRef<
    FormikProps<{
      fullName?: string;
      bio?: string;
      company?: string;
      jobTitle?: string;
      linkedIn?: string;
      github?: string;
      website?: string;
      avatar: string;
    }>
  >();
  const theme = useTheme();
  const {auth} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(auth?.user.avatar);
  return (
    <View style={HomesStyles(theme).container}>
      <Header navigation={navigation} title={'FeedHub'} />
      <View style={styles(theme).topRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles(theme).oppositeReverse}>
          <RightArrowIcon width={20} height={20} />
        </TouchableOpacity>
        <Text style={ProfileStyles(theme).profileDetailsName}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles(theme).body}>
        <SelectImageOption
          setSelectedImage={setSelectedImage}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
        <Text style={styles(theme).titleStyle}>Profile Picture</Text>
        <Text style={styles(theme).description}>
          Upload a picture to make your profile stand out and let people
          recognize your comments and contributions easily!
        </Text>
        <TouchableOpacity
          style={styles(theme).imageContainer}
          onPress={() => setModalVisible(true)}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 25}}
            source={{
              uri: selectedImage,
            }}
          />
        </TouchableOpacity>
        <Text style={styles(theme).titleStyle}>Account Information</Text>

        <Formik
          innerRef={formRef}
          initialValues={{
            fullName: auth?.user.fullName || '',
            company: auth?.user.company || '',
            jobTitle: auth?.user.jobTitle || '',
            bio: auth?.user.bio || '',
            github: auth?.user.github || '',
            website: auth?.user.website || '',
            linkedIn: auth?.user.linkedIn || '',
            avatar: auth?.user.avatar || '',
          }}
          onSubmit={values => {
            const filtered = filterValues({
              ...values,
              avatar: data.url,
            });
            dispatch(
              updateUser({
                id: auth?.user.id || '',
                token: auth?.tokens.access.token || '',
                credentials: filtered,
              }),
            );
            dispatch(clearMedia());
          }}>
          {({handleChange, handleBlur, values, touched, errors}) => (
            <>
              <View style={styles(theme).inputContainer}>
                <UserIcon fill={theme.theme.colors.labelPrimary} width={25} />
                <TextInput
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  placeholder={'Full Name'}
                  placeholderTextColor={theme.theme.colors.labelTertiary}
                  style={{
                    color: theme.theme.colors.labelPrimary,
                    fontSize: 16,
                  }}
                />
              </View>

              {errors.fullName && touched.fullName && (
                <Text style={styles(theme).errorText}>{errors.fullName}</Text>
              )}
              <View style={styles(theme).inputContainer}>
                <AtIcon fill={theme.theme.colors.labelPrimary} width={25} />
                <TextInput
                  value={auth?.user.username}
                  editable={false}
                  placeholder={'Username'}
                  placeholderTextColor={theme.theme.colors.labelTertiary}
                  style={{
                    color: theme.theme.colors.labelPrimary,
                    fontSize: 16,
                  }}
                />
              </View>

              <Text style={[styles(theme).titleStyle, {marginTop: 20}]}>
                About
              </Text>
              <View
                style={[
                  styles(theme).inputContainer,
                  {
                    height: 150,
                    alignItems: 'flex-start',
                  },
                ]}>
                <TextInput
                  onChangeText={handleChange('bio')}
                  onBlur={handleBlur('bio')}
                  value={values.bio}
                  placeholder={'Bio'}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={theme.theme.colors.labelTertiary}
                  style={styles(theme).bioInput}
                />
              </View>
              <View style={styles(theme).inputContainer}>
                <TextInput
                  onChangeText={handleChange('jobTitle')}
                  onBlur={handleBlur('jobTitle')}
                  value={values.jobTitle}
                  placeholder={'Job Title'}
                  placeholderTextColor={theme.theme.colors.labelTertiary}
                  style={{
                    color: theme.theme.colors.labelPrimary,
                    fontSize: 16,
                  }}
                />
              </View>

              <View style={styles(theme).inputContainer}>
                <TextInput
                  onChangeText={handleChange('company')}
                  onBlur={handleBlur('company')}
                  value={values.company}
                  placeholder={'Company'}
                  placeholderTextColor={theme.theme.colors.labelTertiary}
                  style={{
                    color: theme.theme.colors.labelPrimary,
                    fontSize: 16,
                  }}
                />
              </View>

              <Text style={[styles(theme).titleStyle, {marginTop: 20}]}>
                Profile Social Links
              </Text>
              <Text style={styles(theme).description}>
                Add your social media profiles so others can connect with you
                and you can grow your network!
              </Text>
              <View style={styles(theme).inputContainer}>
                <GithubIcon
                  fill={theme.theme.colors.labelTertiary}
                  width={25}
                />
                <TextInput
                  onChangeText={handleChange('github')}
                  onBlur={handleBlur('github')}
                  value={values.github}
                  placeholder={'Github'}
                  placeholderTextColor={theme.theme.colors.labelTertiary}
                  style={{
                    color: theme.theme.colors.labelPrimary,
                    fontSize: 16,
                  }}
                />
              </View>
              <View style={styles(theme).inputContainer}>
                <LinkIcon fill={theme.theme.colors.labelTertiary} width={25} />
                <TextInput
                  onChangeText={handleChange('website')}
                  onBlur={handleBlur('website')}
                  value={values.website}
                  placeholder={'Your website'}
                  placeholderTextColor={theme.theme.colors.labelTertiary}
                  style={{
                    color: theme.theme.colors.labelPrimary,
                    fontSize: 16,
                  }}
                />
              </View>
              <View style={styles(theme).inputContainer}>
                <LinkedInIcon
                  fill={theme.theme.colors.labelTertiary}
                  width={25}
                  height={25}
                />
                <TextInput
                  onChangeText={handleChange('linkedIn')}
                  onBlur={handleBlur('linkedIn')}
                  value={values.linkedIn}
                  placeholder={'LinkedIn'}
                  placeholderTextColor={theme.theme.colors.labelTertiary}
                  style={{
                    color: theme.theme.colors.labelPrimary,
                    fontSize: 16,
                  }}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
      <View style={[styles(theme).topRow, styles(theme).borderTop]}>
        <TouchableOpacity
          onPress={() => {
            formRef.current?.handleSubmit();
            navigation.goBack();
          }}
          style={[
            btnStyles(theme, theme.theme.colors.colorCabbage).btnContainer,
            styles(theme).sumbitBtn,
          ]}>
          <Text style={styles(theme).btnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = (theme: ITheme) =>
  StyleSheet.create({
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      paddingHorizontal: 15,
      gap: 15,
      borderBottomColor: theme.theme.colors.dividerTertiary,
      borderBottomWidth: 1,
    },
    oppositeReverse: {
      transform: [{rotate: '-90deg'}],
    },
    body: {
      padding: 20,
    },
    titleStyle: {
      fontSize: 17,
      fontWeight: '700',
      color: theme.theme.colors.labelPrimary,
    },
    description: {
      fontSize: 15,
      color: theme.theme.colors.labelTertiary,
      marginTop: 10,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 25,
      borderWidth: 0.5,
      borderColor: theme.theme.colors.dividerPrimary,
      marginVertical: 20,
    },
    borderTop: {
      borderTopColor: theme.theme.colors.dividerTertiary,
      borderTopWidth: 1,
      justifyContent: 'flex-end',
    },
    sumbitBtn: {
      marginBottom: 0,
      width: 'auto',
      paddingHorizontal: 20,
    },
    btnText: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.theme.colors.labelInvert,
    },
    errorText: {
      color: theme.theme.colors.labelQuaternary,
      textAlign: 'left',
      width: '96%',
      marginTop: 7,
    },
    inputContainer: {
      backgroundColor: theme.theme.colors.float,
      width: '100%',
      height: 43,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      marginTop: 20,
    },
    bioInput: {
      color: theme.theme.colors.labelPrimary,
      fontSize: 16,
      width: '100%',
      height: '100%',
      textAlignVertical: 'top',
    },
    modalOption: {
      height: '33%',
      borderBottomColor: theme.theme.colors.dividerPrimary,
      borderBottomWidth: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalText: {
      color: theme.theme.colors.labelTertiary,
    },
  });
