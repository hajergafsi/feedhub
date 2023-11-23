import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const NotificationsIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 25}
    height={props.width || 25}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M12 5.926c-.524 0-1.032.069-1.515.198l-.177.052a5.853 5.853 0 0 0-4.152 5.33l-.006.272v3.37a.975.975 0 0 1-.853.968l-.236.014a.975.975 0 0 0-.008 1.936l.122.008h3.9l.005.172a2.926 2.926 0 0 0 2.727 2.748L12 21l.192-.006a2.926 2.926 0 0 0 2.726-2.72l.007-.2h3.9l.122-.008a.975.975 0 0 0 0-1.935l-.236-.014a.976.976 0 0 1-.853-.846l-.008-.123v-3.37l-.004-.22a5.855 5.855 0 0 0-4.153-5.383l-.172-.05A5.868 5.868 0 0 0 12 5.926zM12 3a.975.975 0 1 0 .945 1.215l.022-.117.008-.123A.975.975 0 0 0 12 3z"
      fill={props.fill || '#ccc'}
      stroke={props.stroke || 'transparent'}
      fillRule="evenodd"
    />
  </Svg>
);

export default NotificationsIcon;
