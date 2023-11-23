import * as React from 'react';
import {SvgProps, Svg, Path} from 'react-native-svg';

const Hamburger = (props: SvgProps) => (
  <Svg
    width={props.width || 40}
    height={props.height || 40}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M19 16a1 1 0 0 1 .117 1.993L19 18H5a1 1 0 0 1-.117-1.993L5 16h14zm0-5a1 1 0 0 1 .117 1.993L19 13H5a1 1 0 0 1-.117-1.993L5 11h14zm0-5a1 1 0 0 1 .117 1.993L19 8H5a1 1 0 0 1-.117-1.993L5 6h14z"
      fill={props.fill || '#fff'}
      fillRule="evenodd"
    />
  </Svg>
);

export default Hamburger;
