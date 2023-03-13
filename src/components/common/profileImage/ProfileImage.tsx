import {Image, View} from 'native-base';
import React from 'react';
import {colors} from '~/theme/theme';
import AvatarIcon from '~/assets/icons/avartar.svg';
import {config} from '~/utils/config';
import {ImageStyle, StyleProp} from 'react-native';

interface Props {
  imageName?: string | null;
  width?: number;
  height?: number;
  imageStyle?: StyleProp<ImageStyle>;
}
/**
 *@description 프로필 이미지 공통 모듈
 */
function ProfileImage({imageName, width, height, imageStyle}: Props) {
  return (
    <View>
      {imageName ? (
        <Image
          w={`${width ?? 44}px`}
          h={`${height ?? 44}px`}
          borderRadius={width ?? 44}
          mr="12px"
          style={imageStyle}
          fallbackElement={
            <AvatarIcon
              width={width ?? 44}
              height={height ?? 44}
              fill={colors.grayScale['30']}
              style={[{marginRight: 12}, imageStyle]}
            />
          }
          alt="profile_img"
          source={{
            uri: `${config.IMAGE_BASE_URL}${imageName}`,
          }}
        />
      ) : (
        <AvatarIcon
          width={width ?? 44}
          height={height ?? 44}
          fill={colors.grayScale['30']}
          style={[{marginRight: 12}, imageStyle]}
        />
      )}
    </View>
  );
}

export default ProfileImage;
