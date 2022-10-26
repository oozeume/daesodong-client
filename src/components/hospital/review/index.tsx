import {Box, HStack, Text} from 'native-base';
import {ViewStyle} from 'react-native';

interface Props {
  txt: string;
  lineStyle?: ViewStyle;
}
export default function StarReviewLine({txt, lineStyle}: Props) {
  return (
    <HStack
      justifyContent={'space-between'}
      marginBottom="21px"
      style={lineStyle}>
      <HStack>
        <Text fontSize={15} marginRight="6px">
          {txt}
        </Text>
        <Text fontSize={15} color="#FF6B00">
          0.0
        </Text>
      </HStack>

      <HStack>
        <Box marginRight={'6px'} borderWidth={1} w="28px" h="28px"></Box>
        <Box marginRight={'6px'} borderWidth={1} w="28px" h="28px"></Box>
        <Box marginRight={'6px'} borderWidth={1} w="28px" h="28px"></Box>
        <Box marginRight={'6px'} borderWidth={1} w="28px" h="28px"></Box>
        <Box borderWidth={1} w="28px" h="28px"></Box>
      </HStack>
    </HStack>
  );
}
