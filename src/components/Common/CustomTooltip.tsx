import React from 'react';
import {StyleProp, TouchableHighlight, ViewStyle} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

type Props = {
  content: any;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tooltipVisible: boolean;
  buttonStyle: StyleProp<ViewStyle>;
  buttonContent: any;
  placement: string;
};

const CustomTooltip = ({
  content,
  setVisible,
  tooltipVisible,
  buttonStyle,
  buttonContent,
  placement,
}: Props) => {
  return (
    <Tooltip
      isVisible={tooltipVisible}
      content={content}
      backgroundColor={'transparent'}
      contentStyle={{backgroundColor: 'transparent'}}
      placement={placement}
      onClose={() => setVisible(false)}>
      <TouchableHighlight onPress={() => setVisible(true)} style={buttonStyle}>
        {buttonContent}
      </TouchableHighlight>
    </Tooltip>
  );
};

export default CustomTooltip;
