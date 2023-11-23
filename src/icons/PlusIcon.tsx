import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const PlusSign = (props: SvgProps) => (
  <Svg
    width={props.width || 35}
    height={props.height || 35}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill={props.fill || '#ccc'}
      fillRule="evenodd"
      d="M18.361 11.259a.75.75 0 0 1-.009 1.484l-.102.007h-5.5v5.5a.75.75 0 0 1-1.491.111l-.009-.11V12.75h-5.5l-.111-.009a.75.75 0 0 1 .009-1.484l.102-.007h5.5v-5.5a.75.75 0 0 1 1.491-.111l.009.11v5.501h5.5l.111.009z"
    />
  </Svg>
);
export default PlusSign;
