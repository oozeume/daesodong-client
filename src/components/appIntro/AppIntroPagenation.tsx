import {HStack, View} from 'native-base';
import {colors} from '~/theme/theme';

interface Props {
  pageNumber: number;
}

/**
 *@description 초기 앱 인트로 하단 페이지네이션 (•••)
 */
function AppIntroPagenation({pageNumber}: Props) {
  const activeCircle = colors.fussOrange[0];
  const inactiveCircle = colors.scrim[60];

  return (
    <HStack justifyContent={'center'} mb="40px">
      {['', '', ''].map((_, _index) => (
        <View
          key={_index}
          width="6px"
          height="6px"
          marginX={_index === 1 ? '6px' : 0}
          borderRadius={6}
          bgColor={
            pageNumber === _index ? activeCircle : inactiveCircle
          }></View>
      ))}
    </HStack>
  );
}

export default AppIntroPagenation;
