import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function BlockIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width || 30}
      height={props.height || 30}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        d="M12 3a9 9 0 100 18 9 9 0 000-18zm5.795 4.296l.177.238A7.457 7.457 0 017.793 18.158l-.26-.186-.237-.177L17.795 7.296zM12 4.543a7.42 7.42 0 014.207 1.299l.26.186.237.177L6.205 16.704l-.177-.238A7.457 7.457 0 0112 4.543z"
        fill={props.fill || '#ccc'}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default BlockIcon;
