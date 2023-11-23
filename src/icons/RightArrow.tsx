import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const RightArrowIcon = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} viewBox="0 0 24 24" {...props}>
    <Path
      d="m12.56 7.23 6.752 6.604c.254.254.253.694-.018.965a.695.695 0 0 1-.983 0L12 8.68l-6.29 6.098c-.294.293-.734.294-1.005.022a.695.695 0 0 1 0-.983l6.716-6.568a.8.8 0 0 1 1.14-.018z"
      fill={props.fill || '#ccc'}
      fillRule="evenodd"
    />
  </Svg>
);

export default RightArrowIcon;
