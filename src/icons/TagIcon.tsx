import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const TagIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 35}
    height={props.width || 35}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill={props.fill || '#ccc'}
      fillRule="evenodd"
      d="M10.236 3a2.333 2.333 0 0 1 2.333 2.333l-.004.13-.01.128-.083.742h.314l.14-1.257a2.334 2.334 0 0 1 1.993-2.053l.166-.018.16-.005h.824a2.333 2.333 0 0 1 2.333 2.333l-.003.13-.011.128-.083.742h.362c1.18 0 2.157.878 2.312 2.017l.016.157.005.16V9.5c0 1.235-.96 2.246-2.174 2.328l-.16.005h-.972l-.037.333h.176c1.182 0 2.158.878 2.312 2.017l.016.157.006.16v.833c0 1.235-.96 2.246-2.174 2.328l-.16.006-.787-.001-.14 1.258a2.334 2.334 0 0 1-1.992 2.053l-.166.018-.16.005h-.824a2.333 2.333 0 0 1-2.333-2.333l.004-.13.01-.128.082-.743h-.314l-.14 1.258a2.334 2.334 0 0 1-1.992 2.053l-.166.018-.16.005H7.93a2.333 2.333 0 0 1-2.333-2.333l.003-.13.011-.128.082-.743h-.36A2.334 2.334 0 0 1 3.02 15.65l-.016-.157-.005-.16V14.5c0-1.235.96-2.246 2.174-2.328l.16-.005.971-.001.037-.333h-.175a2.334 2.334 0 0 1-2.312-2.016l-.016-.157-.006-.16v-.833c0-1.235.96-2.246 2.174-2.328l.16-.006h.786l.14-1.257a2.334 2.334 0 0 1 1.993-2.053l.166-.018.16-.005h.824zm0 1.5h-.823a.833.833 0 0 0-.81.638l-.019.103-.189 1.703a1 1 0 0 1-.994.89H6.167a.833.833 0 0 0-.827.728l-.007.105V9.5c0 .425.318.775.73.827l.104.006H6.9a1 1 0 0 1 1 1l-.006.11-.148 1.334a1 1 0 0 1-.994.89h-1.42a.833.833 0 0 0-.827.728L4.5 14.5v.833c0 .425.318.776.729.827l.104.007h.92a1 1 0 0 1 1 1l-.001.055-.15 1.353a.833.833 0 0 0 .725.919l.104.006h.823l.105-.007a.832.832 0 0 0 .703-.621l.02-.113.19-1.703a1 1 0 0 1 .993-.89h1.321a1 1 0 0 1 1 1l-.006.111-.144 1.298a.833.833 0 0 0 .724.919l.104.006h.823l.105-.007a.83.83 0 0 0 .703-.621l.02-.113.19-1.703a1 1 0 0 1 .994-.89h1.234l.105-.006a.834.834 0 0 0 .722-.722l.007-.105V14.5a.833.833 0 0 0-.73-.827l-.104-.006H17.1a1 1 0 0 1-1-1l.006-.11.148-1.334a1 1 0 0 1 .994-.89h1.42l.104-.006a.834.834 0 0 0 .723-.722L19.5 9.5v-.833a.833.833 0 0 0-.729-.827l-.104-.007h-.92a1 1 0 0 1-1-1l.001-.055.15-1.353a.833.833 0 0 0-.725-.919L16.07 4.5h-.823a.833.833 0 0 0-.81.638l-.018.103-.19 1.703a1 1 0 0 1-.993.89h-1.321a1 1 0 0 1-1-1l.006-.111.144-1.298a.833.833 0 0 0-.724-.919l-.104-.006zm1.178 5.833h1.32a1 1 0 0 1 1 .994l-.006.117-.148 1.333a1 1 0 0 1-.878.883l-.116.007h-1.32a1 1 0 0 1-1-.994l.006-.117.148-1.333a1 1 0 0 1 .878-.883l.116-.007z"
    />
  </Svg>
);
export default TagIcon;
