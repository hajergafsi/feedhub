import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const GoogleUniColor = (props: SvgProps) => (
  <Svg
    width={props.width || 35}
    height={props.height || 35}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M3.048 16.767A10.242 10.242 0 0 1 2 12.233 10.203 10.203 0 0 1 12.233 2c2.604 0 4.93.977 6.744 2.558L16 7.535a5.916 5.916 0 0 0-3.767-1.349 6.035 6.035 0 0 0-6.047 6.047 6.035 6.035 0 0 0 6.047 6.047c2.837 0 4.976-1.443 5.488-3.954h-5.488v-3.954h9.534c.14.605.233 1.256.233 1.86 0 6.512-4.651 10.233-9.767 10.233-4.044 0-7.52-2.315-9.185-5.698z"
      fill={props.fill || '#ccc'}
      fillRule="evenodd"
    />
  </Svg>
);

export default GoogleUniColor;
