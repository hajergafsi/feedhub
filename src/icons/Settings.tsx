import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SettingsIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 35}
    height={props.height || 35}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M16.5 12a3 3 0 0 1 3 3v1.5a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3H5.25a.75.75 0 1 1 0-1.5H12a3 3 0 0 1 3-3h1.5zm0 1.5H15a1.5 1.5 0 0 0-1.493 1.356L13.5 15v1.5a1.5 1.5 0 0 0 1.356 1.493L15 18h1.5a1.5 1.5 0 0 0 1.493-1.356L18 16.5V15a1.5 1.5 0 0 0-1.356-1.493L16.5 13.5zM9 4.5a3 3 0 0 1 3 3h6.75a.75.75 0 1 1 0 1.5H12a3 3 0 0 1-3 3H7.5a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H9zM7.5 6a1.5 1.5 0 0 0-1.493 1.356L6 7.5V9a1.5 1.5 0 0 0 1.356 1.493l.144.007H9a1.5 1.5 0 0 0 1.493-1.356L10.5 9V7.5a1.5 1.5 0 0 0-1.356-1.493L9 6H7.5z"
      fill={props.fill || '#fff'}
      fillRule="evenodd"
    />
  </Svg>
);

export default SettingsIcon;
