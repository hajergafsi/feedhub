import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SearchIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 35}
    height={props.height || 35}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M10 3a7 7 0 0 1 6.068 10.492 2.813 2.813 0 0 1 2.076.67l.157.147 1.872 1.871a2.823 2.823 0 0 1-3.852 4.125l-.14-.132-1.872-1.872a2.817 2.817 0 0 1-.818-2.234A7 7 0 1 1 10 3zm7.24 12.37a1.323 1.323 0 0 0-1.967 1.763l.096.108 1.872 1.871c.241.242.552.37.868.386h.135l.135-.014a1.324 1.324 0 0 0 .83-2.136l-.097-.107-1.871-1.872zM10 4.5a5.5 5.5 0 0 0-.221 10.996L10 15.5l.221-.004A5.5 5.5 0 0 0 10 4.5z"
      fill={props.fill || '#fff'}
      fillRule="evenodd"
    />
  </Svg>
);

export default SearchIcon;
