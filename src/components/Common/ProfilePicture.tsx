import React from 'react';
import {Image} from 'react-native';

const ProfilePicture = ({avatar}: {avatar: string}) =>
  avatar && (
    <Image
      source={{uri: avatar}}
      style={{width: 30, height: 30, borderRadius: 10}}
    />
  );

export default ProfilePicture;
