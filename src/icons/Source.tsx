import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SourceIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 25}
    height={props.height || 25}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M14.47 6.22a.75.75 0 0 1 .976-.073l.084.073 5.254 5.25a.75.75 0 0 1 .073.976l-.073.084-5.254 5.25a.75.75 0 0 1-1.133-.975l.073-.085L19.193 12 14.47 7.28a.75.75 0 0 1-.073-.976l.073-.084zM9.534 17.78a.75.75 0 0 1-.976.073l-.085-.073-5.253-5.25a.75.75 0 0 1-.073-.976l.073-.084 5.253-5.25a.75.75 0 0 1 1.134.975l-.073.085L4.811 12l4.723 4.72a.75.75 0 0 1 .073.976l-.073.084z"
      fill={props.fill || '#ccc'}
      fillRule="evenodd"
    />
  </Svg>
);

export default SourceIcon;
