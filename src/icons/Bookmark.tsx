import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const BookmarkIcon = (props: SvgProps) => (
  <Svg width={props.width || 35} height={props.width || 35} viewBox="0 0 24 24">
    <Path
      fill={props.fill || 'transparent'}
      stroke={props.stroke || 'transparent'}
      strokeWidth={1.5}
      fillRule="evenodd"
      d="M16.444 3c1.178 0 2.152.917 2.224 2.092l.926 15.317a.557.557 0 0 1-.887.482l-6.247-4.616a1.116 1.116 0 0 0-1.324 0L4.888 20.89a.557.557 0 0 1-.887-.482l.926-15.317A2.228 2.228 0 0 1 7.15 3h9.293z"
    />
  </Svg>
);

export default BookmarkIcon;
