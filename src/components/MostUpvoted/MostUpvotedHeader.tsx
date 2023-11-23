import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ITheme, useTheme} from '../../contexts';
import {EUpvotePeriod, getFeeds, useAppDispatch} from '../../store';
import DropDownPicker from 'react-native-dropdown-picker';
import RightArrowIcon from '../../icons/RightArrow';

const MostUpvotedHeader = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [sortingOption, setSortingOption] = useState<EUpvotePeriod>(
    EUpvotePeriod.WEEK,
  );
  const [value, setValue] = useState(sortingOption);

  useEffect(() => {
    dispatch(getFeeds({mostUpvoted: true, upVoteSorting: sortingOption}));
  }, [dispatch, sortingOption]);
  const [items, setItems] = useState([
    {
      label: `Last ${EUpvotePeriod.MONTH}`,
      value: EUpvotePeriod.MONTH,
      labelStyle: {
        color: theme.theme.colors.labelTertiary,
      },
    },
    {
      label: `Last ${EUpvotePeriod.WEEK}`,
      value: EUpvotePeriod.WEEK,
      labelStyle: {
        color: theme.theme.colors.labelTertiary,
      },
    },
    {
      label: `Last ${EUpvotePeriod.YEAR}`,
      value: EUpvotePeriod.YEAR,
      labelStyle: {
        color: theme.theme.colors.labelTertiary,
      },
    },
  ]);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View style={HStyles(theme).container}>
      <Text style={HStyles(theme).title}>Most upvoted</Text>
      <View style={{width: '45%'}}>
        <DropDownPicker
          style={HStyles(theme).sortingButton}
          open={open}
          value={value}
          items={items}
          textStyle={{color: theme.theme.colors.labelSecondary}}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={`Last ${sortingOption}`}
          onChangeValue={v => setSortingOption(v as EUpvotePeriod)}
          placeholderStyle={HStyles(theme).sortingButtonText}
          dropDownContainerStyle={HStyles(theme).dropDownContainerStyle}
          selectedItemContainerStyle={{
            backgroundColor: theme.theme.colors.active,
          }}
          showArrowIcon
          ArrowUpIconComponent={() => (
            <RightArrowIcon
              fill={theme.theme.colors.labelSecondary}
              width={25}
              height={25}
            />
          )}
          ArrowDownIconComponent={() => (
            <View style={{transform: [{rotate: '180deg'}]}}>
              <RightArrowIcon
                fill={theme.theme.colors.labelSecondary}
                width={25}
                height={25}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MostUpvotedHeader;

export const HStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 30,
      paddingHorizontal: 20,
    },
    title: {
      fontWeight: '700',
      color: theme.theme.colors.labelPrimary,
      fontSize: 18,
    },
    sortingButton: {
      borderWidth: 1,
      borderColor: theme.theme.colors.labelSecondary,
      borderRadius: 14,
      height: 45,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'transparent',
      color: '#ccc',
      borderBottomStartRadius: 14,
      borderBottomEndRadius: 14,
    },
    sortingButtonText: {
      color: theme.theme.colors.labelSecondary,
      fontSize: 15,
    },
    dropDownContainerStyle: {
      backgroundColor: theme.theme.colors.backgroundSecondary,
      marginTop: 7,
      borderRadius: 10,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      width: '100%',
      borderColor: theme.theme.colors.labelTertiary,
    },
  });
