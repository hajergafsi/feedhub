import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const DevCard = (props: SvgProps) => (
  <Svg
    width={props.width || 25}
    height={props.height || 25}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M19.5 16.5a4.5 4.5 0 0 1-4.288 4.495L15 21H9a4.5 4.5 0 0 1-4.495-4.288L4.5 16.5v-9a4.5 4.5 0 0 1 4.288-4.495L9 3h6a4.5 4.5 0 0 1 4.495 4.288l.005.212v9zM18 10.146V7.5a3 3 0 0 0-2.824-2.995L15 4.5H9a3 3 0 0 0-2.995 2.824L6 7.5v9a3 3 0 0 0 2.824 2.995L9 19.5h6a3 3 0 0 0 2.977-2.624 4.5 4.5 0 1 1 .024-6.73zM11 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm7 5.5a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"
      fill={props.fill || '#000'}
      fillRule="evenodd"
    />
  </Svg>
);

export default DevCard;
