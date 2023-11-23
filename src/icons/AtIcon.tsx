import * as React from 'react';
import Svg, {Defs, ClipPath, Path, G, SvgProps} from 'react-native-svg';

const AtIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 30}
    height={props.height || 30}
    viewBox="0 0 24 24"
    {...props}>
    <Defs>
      <ClipPath id="a">
        <Path d="M9.69 0a6.812 6.812 0 0 1 6.807 6.576l.004.235v3.527a3.284 3.284 0 0 1-5.768 2.148l-.064-.08-.103.103a4.117 4.117 0 0 1-2.595 1.106l-.227.007a4.135 4.135 0 0 1-4.135-4.136v-.972A4.135 4.135 0 0 1 9.95 5.016l.034.023.005-.016a.974.974 0 0 1 .802-.638l.114-.007c.488 0 .899.362.966.858l.007.115v4.987a1.338 1.338 0 0 0 2.67.126l.006-.126V6.81a4.864 4.864 0 0 0-4.66-4.86l-.205-.005H6.81a4.864 4.864 0 0 0-4.86 4.66l-.004.205v4.378a4.864 4.864 0 0 0 4.66 4.86l.205.005H9.69a.973.973 0 0 1 .115 1.939L9.69 18H6.81a6.812 6.812 0 0 1-6.806-6.576L0 11.189V6.811A6.812 6.812 0 0 1 6.576.004L6.811 0H9.69zM7.744 6.324c-1.21 0-2.19.98-2.19 2.19v.972a2.19 2.19 0 1 0 4.379 0v-.972c0-1.21-.98-2.19-2.19-2.19z" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#a)" transform="translate(3.5 3)">
      <Path fill={props.fill || '#ccc'} d="M0 0h16.5v18H0V0z" />
    </G>
  </Svg>
);

export default AtIcon;
