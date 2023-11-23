import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function ThreePoints(props: SvgProps) {
  return (
    <Svg
      width={props.width || 35}
      height={props.height || 35}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        d="M12 17a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM12 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
        fill={props.fill || '#ccc'}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default ThreePoints;
