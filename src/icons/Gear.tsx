import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const GearIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 25}
    height={props.height || 25}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M12 3a3 3 0 0 1 2.758 1.817l.067.171.035.106.04-.02a3.004 3.004 0 0 1 3.151.29l.169.137.144.135a3.001 3.001 0 0 1 .645 3.284l-.082.18-.023.039.108.036a3.003 3.003 0 0 1 1.964 2.446l.019.203L21 12a3 3 0 0 1-1.817 2.758l-.171.067-.107.035.021.04a3.004 3.004 0 0 1-.29 3.151l-.137.169-.135.144a3.001 3.001 0 0 1-3.284.645l-.18-.082-.04-.023-.035.108a3.003 3.003 0 0 1-2.446 1.964l-.203.019L12 21a3 3 0 0 1-2.758-1.817l-.067-.172-.036-.106-.039.021a3.004 3.004 0 0 1-3.151-.29L5.78 18.5l-.144-.135a3.001 3.001 0 0 1-.645-3.284l.082-.18.022-.04-.107-.035a3.003 3.003 0 0 1-1.964-2.446l-.019-.203L3 12a3 3 0 0 1 1.817-2.758l.172-.067.105-.036-.02-.039a3.004 3.004 0 0 1 .29-3.151L5.5 5.78l.135-.144a3.001 3.001 0 0 1 3.284-.645l.18.082.039.022.036-.107a3.003 3.003 0 0 1 2.446-1.964l.203-.019L12 3zm0 1.5a1.5 1.5 0 0 0-1.493 1.356L10.5 6v1.229a5.06 5.06 0 0 0-.55.209l-.262.127-.87-.868a1.5 1.5 0 0 0-2.224 2.007l.103.114.868.87c-.09.172-.17.35-.24.534l-.096.279L6 10.5a1.5 1.5 0 0 0-.144 2.993L6 13.5h1.229c.06.188.129.372.209.55l.127.262-.868.87a1.5 1.5 0 0 0 1.06 2.56l.144-.006a1.5 1.5 0 0 0 .803-.33l.114-.103.87-.868c.172.09.35.17.534.24l.279.096L10.5 18a1.5 1.5 0 0 0 1.356 1.493L12 19.5l.144-.007a1.5 1.5 0 0 0 1.35-1.349L13.5 18v-1.229a5.19 5.19 0 0 0 .55-.209l.262-.127.87.868c.293.293.677.44 1.06.44l.144-.007a1.5 1.5 0 0 0 1.02-2.44l-.103-.114-.868-.87c.09-.172.17-.35.24-.533l.096-.279H18l.144-.007a1.5 1.5 0 0 0 0-2.986L18 10.5h-1.229a4.964 4.964 0 0 0-.209-.55l-.127-.262.868-.87a1.5 1.5 0 0 0-2.007-2.224l-.114.103-.87.868a5.01 5.01 0 0 0-.533-.24L13.5 7.23V6A1.5 1.5 0 0 0 12 4.5zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
      fill={props.fill || '#ccc'}
      fillRule="evenodd"
    />
  </Svg>
);

export default GearIcon;
