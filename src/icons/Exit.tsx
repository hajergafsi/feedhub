import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const ExitIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 25}
    height={props.height || 25}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M18.804 4.147a.75.75 0 0 1 1.049 1.05l-.073.083L13.061 12l6.72 6.72a.75.75 0 0 1-.977 1.133l-.084-.073L12 13.061l-6.72 6.72-.084.072a.75.75 0 0 1-1.049-1.05l.073-.083L10.939 12l-6.72-6.72a.75.75 0 0 1 .977-1.133l.084.073L12 10.939l6.72-6.72.084-.072z"
      fill={props.fill || '#ccc'}
      fillRule="evenodd"
    />
  </Svg>
);

export default ExitIcon;
