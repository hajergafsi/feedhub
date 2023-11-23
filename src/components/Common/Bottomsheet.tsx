import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {SharedValue} from 'react-native-reanimated';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {ITheme, useTheme} from '../../contexts';
import ExitIcon from '../../icons/Exit';

type props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  snapPoints: (string | number)[] | SharedValue<(string | number)[]>;
  handleSheetChanges?: (index: number) => void;
  children: any;
  Header: string;
  Footer?: any;
};

const BottomSheet = ({
  bottomSheetModalRef,
  snapPoints,
  handleSheetChanges,
  Header,
  Footer,
  children,
}: props) => {
  // ref

  const backdrop: React.FC<BottomSheetBackdropProps> = ({}) => {
    return <View style={{backgroundColor: 'pink'}} />;
  };

  const theme = useTheme();
  // renders
  return (
    <BottomSheetModalProvider>
      <View style={styles(theme).container}>
        <BottomSheetModal
          backdropComponent={backdrop}
          backgroundStyle={{
            backgroundColor: theme.theme.colors.backgroundTertiary,
          }}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles(theme).header}>
            <Text style={styles(theme).modalText}>{Header}</Text>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.close()}>
              <ExitIcon fill={theme.theme.colors.labelTertiary} />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'space-between', height: '91%'}}>
            <View style={styles(theme).modalBody}>{children}</View>
            <View style={styles(theme).footer}>{Footer}</View>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default BottomSheet;
const styles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
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
      height: 55,
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
