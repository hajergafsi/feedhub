import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const HomeIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 35}
    height={props.height || 35}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="m13.378 3.57 7.077 6.168A1.853 1.853 0 0 1 21 11v8a2 2 0 1 1-4 0v-3a2 2 0 0 0-1.85-1.995L15 14H9a2 2 0 0 0-1.995 1.85L7 16v3a2 2 0 1 1-4 0v-8a1.853 1.853 0 0 1 .545-1.262l7.077-6.167a1.949 1.949 0 0 1 2.756 0z"
      fill={props.fill || '#fff'}
      stroke={props.stroke || '#fff'}
      strokeWidth={1.5}
      fillRule="evenodd"
    />
  </Svg>
);

export default HomeIcon;
