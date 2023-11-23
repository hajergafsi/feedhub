import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const EyeIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 25}
    height={props.height || 25}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M12 4.5c3.828 0 6.74 2.287 8.62 6.592l.139.326L21 12l-.241.582C18.885 17.097 15.924 19.5 12 19.5c-3.828 0-6.74-2.287-8.62-6.592l-.139-.326L3 12l.241-.582C5.115 6.903 8.076 4.5 12 4.5zM12 6c-3.27 0-5.736 2-7.395 6 1.66 4 4.124 6 7.395 6 3.27 0 5.736-2 7.395-6-1.66-4-4.124-6-7.395-6zm0 1.75a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5zm0 1.5a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5z"
      fill={props.fill || '#ccc'}
      fillRule="evenodd"
    />
  </Svg>
);

export default EyeIcon;
