import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ITheme, useTheme} from '../../contexts';
import Modal from 'react-native-modal';
import ExitIcon from '../../icons/Exit';

type Props = {
  modalVisible: boolean;
  setModalVisible:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((state: boolean) => void);
  children: any;
  Header?: string;
  HeaderLeft?: any;
  Footer?: any;
  CustomHeader?: any;
};

const CustomModal = ({
  modalVisible,
  setModalVisible,
  children,
  Header,
  HeaderLeft,
  Footer,
  CustomHeader,
}: Props) => {
  const theme = useTheme();

  return (
    <View style={styles(theme).centeredView}>
      <Modal
        backdropColor={'#5f37e93d'}
        avoidKeyboard={false}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        isVisible={modalVisible}>
        <View style={styles(theme).modalView}>
          {CustomHeader && <View>{CustomHeader}</View>}
          {Header && (
            <View style={styles(theme).header}>
              {HeaderLeft}
              <Text style={styles(theme).modalText}>{Header}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <ExitIcon fill={theme.theme.colors.labelTertiary} />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              justifyContent: 'space-between',
              height: Header || CustomHeader ? '91%' : '100%',
            }}>
            <>
              <View style={styles(theme).modalBody}>{children}</View>
              {Footer && <View style={styles(theme).footer}>{Footer}</View>}
            </>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = (theme: ITheme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
    },
    modalView: {
      margin: 5,
      width: '100%',
      height: '100%',
      backgroundColor: theme.theme.colors.backgroundTertiary,
      borderRadius: 20,
      borderColor: theme.theme.colors.dividerSecondary,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    header: {
      height: 55,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      borderBottomColor: theme.theme.colors.dividerSecondary,
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    footer: {
      height: 65,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopColor: theme.theme.colors.dividerSecondary,
      borderTopWidth: 1,
    },
    modalBody: {
      paddingTop: 25,
      paddingHorizontal: 26,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },

    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      textAlign: 'center',
      color: theme.theme.colors.labelTertiary,
      fontSize: 20,
      fontWeight: '700',
    },
    modalTitle: {
      color: theme.theme.colors.labelTertiary,
      fontSize: 13,
      fontWeight: '700',
      marginBottom: 13,
    },
  });
