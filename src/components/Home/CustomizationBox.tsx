import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ITheme, useTheme} from '../../contexts';
import PlusSign from '../../icons/PlusIcon';
import CustomModal from '../Common/CustomModal';
import TopicBox from './TopicBox';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuth} from '../../hooks';
import {
  IAuth,
  openModal,
  updateUser,
  useAppDispatch,
  useAppSelector,
} from '../../store';

const ModalContent = (
  theme: ITheme,
  step: number,
  selected: string[],
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  topics: string[],
) => (
  <View>
    {step === 1 ? (
      <Text style={styles(theme).modalTitle}>
        Make the feed,
        <Text style={{color: theme.theme.colors.colorCabbage}}> your feed</Text>
      </Text>
    ) : (
      <Text style={styles(theme).modalTitle}>Choose topics to follow</Text>
    )}
    <Text style={styles(theme).modalDescription}>
      {step === 1
        ? "Supercharge your feed with content you'll love reading!"
        : 'Pick topics you are interested in. You can always change these later.'}
    </Text>
    {step === 1 && (
      <Image
        source={{
          uri: 'https://daily-now-res.cloudinary.com/image/upload/v1667998924/public/your_feed.png',
        }}
        style={styles(theme).modalImage}
      />
    )}
    {step === 2 && (
      <View style={{height: 470, marginTop: 20}}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}>
          {topics.map((item, i) => (
            <TopicBox
              text={item}
              key={i}
              selected={selected.find(elem => item === elem) ? true : false}
              setSelected={setSelected}
            />
          ))}
        </ScrollView>
      </View>
    )}
  </View>
);

const ModalFooter = (
  theme: ITheme,
  setModal: React.Dispatch<React.SetStateAction<boolean>>,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  step: number,
  isAuthenticated: boolean,
  topics: string[],
  auth: IAuth | null,
) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles(theme).row}>
      <TouchableOpacity
        onPress={
          step === 1 ? () => setModal(false) : () => setStep(step => step - 1)
        }>
        <Text style={styles(theme).modalBtnText}>
          {step === 1 ? 'Skip' : 'Back'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={step === 2 && (topics ? false : true)}
        onPress={
          step < 2
            ? () => setStep(step => step + 1)
            : isAuthenticated
            ? () => {
                if (auth)
                  dispatch(
                    updateUser({
                      id: auth?.user.id,
                      credentials: {tags: topics},
                      token: auth?.tokens.access.token,
                    }),
                  );
                setModal(false);
              }
            : () => {
                //setModal(false);
                dispatch(openModal({}));
              }
        }
        style={[
          styles(theme).button,
          {height: '60%', marginTop: 0, width: 100},
        ]}>
        <Text
          style={[
            styles(theme).modalBtnText,
            {color: theme.theme.colors.labelInvert},
          ]}>
          {step === 1 ? 'Continue' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const CustomizationBox = () => {
  const theme = useTheme();
  const [customizationModal, setCustomizationModal] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [chosenTopics, setChosenTopics] = useState<string[]>([]);
  const {auth} = useAuth();
  const isAuthenticated = !!auth?.tokens?.access.token;
  const topics = useAppSelector(state => state.topics.data);
  return (
    <View style={styles(theme).container}>
      <Text
        style={{color: theme.theme.colors.labelPrimary, textAlign: 'center'}}>
        Get the content you need by creating a personal feed
      </Text>
      <TouchableOpacity
        style={styles(theme).button}
        onPress={() => setCustomizationModal(true)}>
        <PlusSign fill={theme.theme.colors.labelInvert} width={25} />
        <Text style={styles(theme).buttonText}>Choose Tags</Text>
      </TouchableOpacity>
      <CustomModal
        modalVisible={customizationModal}
        setModalVisible={setCustomizationModal}
        children={ModalContent(
          theme,
          step,
          chosenTopics,
          setChosenTopics,
          topics,
        )}
        Footer={ModalFooter(
          theme,
          setCustomizationModal,
          setStep,
          step,
          isAuthenticated,
          chosenTopics,
          auth,
        )}
      />
    </View>
  );
};

export default CustomizationBox;

const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.theme.colors.colorCabbage,
      borderWidth: 1,
      borderRadius: 12,
      marginBottom: 20,
      backgroundColor: theme.theme.colors.backgroundPrimary,
      shadowColor: '#c029f0',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 7,
      shadowRadius: 2.54,
      elevation: 3,
    },
    button: {
      width: 135,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.theme.colors.colorCabbage,
      borderRadius: 10,
      marginTop: 10,
    },
    buttonText: {
      fontSize: 15,
      color: theme.theme.colors.labelInvert,
      fontWeight: '700',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      width: '100%',
      paddingHorizontal: '7%',
    },
    modalBtnText: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.theme.colors.labelTertiary,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.theme.colors.labelPrimary,
    },
    modalDescription: {
      fontSize: 15,
      marginTop: 15,
      textAlign: 'center',
      color: theme.theme.colors.labelPrimary,
    },
    modalImage: {
      width: '100%',
      height: '70%',
      resizeMode: 'cover',
      marginTop: 50,
      transform: [{scaleX: 1.75}, {scaleY: 2}],
    },
  });
