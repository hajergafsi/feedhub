import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const MostUpvoted = (props: SvgProps) => (
  <Svg
    width={props.width || 25}
    height={props.height || 25}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill={props.fill || '#ccc'}
      stroke={props.stroke || 'transparent'}
      fillRule="evenodd"
      d="M13.234 3.395c.191.136.358.303.494.493l7.077 9.285a1.06 1.06 0 0 1-1.167 1.633l-4.277-1.284a1.06 1.06 0 0 0-1.355.866l-.814 5.701a1.06 1.06 0 0 1-1.05.911h-.281a1.06 1.06 0 0 1-1.05-.91l-.815-5.702a1.06 1.06 0 0 0-1.355-.866l-4.276 1.284a1.06 1.06 0 0 1-1.167-1.633l7.077-9.285a2.121 2.121 0 0 1 2.96-.493z"
    />
  </Svg>
);

export default MostUpvoted;
