import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';
import {ETheme, ITheme, useTheme} from '../../contexts';
import BottomSheet from '../Common/Bottomsheet';

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
};

const CustomizeBottomSheet = ({bottomSheetModalRef}: Props) => {
  const theme = useTheme();
  const [showFeedSorting, setShowFeedSorting] = useState(true);
  const snapPoints = useMemo(() => ['25%', '80%'], []);

  const themeOptions: {title: string; value: ETheme; onPress: () => void}[] = [
    {
      title: 'Dark',
      value: ETheme.DARK,
      onPress: theme.toggleDark,
    },
    {
      title: 'Light',
      value: ETheme.LIGHT,
      onPress: theme.toggleLight,
    },
    {
      title: 'Auto',
      value: ETheme.AUTO,
      onPress: theme.toggleAuto,
    },
  ];

  const densityOptions: string[] = ['Eco', 'Roomy', 'Cozy'];
  const [density, setDensity] = useState<string>(densityOptions[0]);

  const content = (
    <>
      <Text style={styles(theme).modalTitle}>Theme</Text>
      {themeOptions.map((item, i) => (
        <TouchableOpacity
          style={styles(theme).option}
          onPress={() => item.onPress()}
          key={i}>
          <View
            style={[
              styles(theme).radioBtnContainer,
              theme.theme.current === item.value &&
                styles(theme).radioBtnContainerSelected,
            ]}>
            <View
              style={[
                styles(theme).radioBtn,
                theme.theme.current === item.value
                  ? styles(theme).radioBtnSelected
                  : null,
              ]}
            />
          </View>
          <Text style={styles(theme).optionText}>{item.title}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[styles(theme).modalTitle, {marginTop: 20}]}>Density</Text>
      {densityOptions.map((item, i) => (
        <TouchableOpacity
          style={styles(theme).option}
          onPress={() => setDensity(item)}
          key={i}>
          <View
            style={[
              styles(theme).radioBtnContainer,
              density === item && styles(theme).radioBtnContainerSelected,
            ]}>
            <View
              style={[
                styles(theme).radioBtn,
                density === item ? styles(theme).radioBtnSelected : null,
              ]}
            />
          </View>
          <Text style={styles(theme).optionText}>{item}</Text>
        </TouchableOpacity>
      ))}
      <Text style={[styles(theme).modalTitle, {marginTop: 20}]}>
        Preferences
      </Text>
      <TouchableOpacity style={styles(theme).option}>
        <Switch
          trackColor={{
            false: theme.theme.colors.overlayQuaternary,
            true: theme.theme.colors.overlayCabbage,
          }}
          thumbColor={
            showFeedSorting
              ? theme.theme.colors.statusCabbage
              : theme.theme.colors.labelTertiary
          }
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setShowFeedSorting(!showFeedSorting)}
          value={showFeedSorting}
        />
        <Text style={styles(theme).optionText}>Show feed sorting menu</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <BottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      snapPoints={snapPoints}
      children={content}
      Header={'Customize'}
    />
  );
};

export default CustomizeBottomSheet;

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
    modalBody: {
      paddingTop: 25,
      paddingHorizontal: 26,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
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
  });
