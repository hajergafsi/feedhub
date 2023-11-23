import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ITheme, useTheme} from '../../contexts';
import ProfileStyles from '../../styles/ProfileStyles';
import {ContributionGraph} from 'react-native-chart-kit';
import hexToRgba from 'hex-to-rgba';
import {TooltipDataAttrs} from 'react-native-chart-kit/dist/contribution-graph/ContributionGraph';
import {RectProps} from 'react-native-svg';
import {useAppSelector} from '../../store';

const UserActivity = () => {
  const theme = useTheme();

  const {currentYearActivity} = useAppSelector(state => state.user);
  const getTotal = () => {
    let total = 0;
    if (currentYearActivity) currentYearActivity.map(e => (total += e.count));
    return total;
  };
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'transparent',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => hexToRgba(theme.theme.colors.labelPrimary, opacity),
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  // Define a custom function to handle tooltip data attributes
  const customizeTooltipData: TooltipDataAttrs = () => {
    const attributes: Partial<RectProps> = {};
    return attributes;
  };

  return (
    <View style={userActivityStyles(theme).container}>
      <Text style={ProfileStyles(theme).detailsBtnText}>Activity</Text>
      <View style={userActivityStyles(theme).horizontalLine} />
      <Text style={[ProfileStyles(theme).detailsBtnText, {marginBottom: 20}]}>
        Posts read in the last months ({getTotal()})
      </Text>
      <ContributionGraph
        values={currentYearActivity || []}
        endDate={new Date()}
        numDays={120}
        width={300}
        height={170}
        chartConfig={chartConfig}
        gutterSize={5}
        squareSize={10}
        tooltipDataAttrs={customizeTooltipData}
      />
    </View>
  );
};

export default UserActivity;

const userActivityStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 20,
      marginBottom: 20,
    },
    horizontalLine: {
      width: '120%',
      height: 0.5,
      marginLeft: -20,
      marginVertical: 15,
      backgroundColor: theme.theme.colors.dividerTertiary,
    },
    descriptionText: {
      color: theme.theme.colors.labelTertiary,
      fontSize: 15,
      marginTop: 20,
    },
  });
