import {Stack, useDisclose} from 'native-base';
import React, {useEffect, useState} from 'react';
import Button from '~/components/common/button';
import {colors} from '~/theme/theme';
import LayoutContainer from './layoutContainer';
import AddressSidoDrawer, {Hangjungdong} from './addressSidoDrawer';
import AddressDongDrawer from './addressDongDrawer';
import AddressSigugunDrawer from './addressSigugunDrawer';
import {hangjungdong} from '~/utils/hangjungdong';
import SelectButtonForm from './selectButtonForm';
import _ from 'lodash';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 주소
 */

function Address({handlePage}: Props) {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {sigugun, dong} = hangjungdong;
  const {
    isOpen: isSigugunOpen,
    onOpen: onSigugunOpen,
    onClose: onSigugunClose,
  } = useDisclose();

  const {
    isOpen: isDongOpen,
    onOpen: onDongOpen,
    onClose: onDongClose,
  } = useDisclose();

  const [sidoValue, setSidoValue] = useState<Partial<Hangjungdong>>();
  const [sigugunValue, setSigugunValue] = useState<Partial<Hangjungdong>>();
  const [dongValue, setDongValue] = useState<Hangjungdong>();

  const [sortedSigugun, setSortedSigugun] = useState<any[]>();
  const [sortedDong, setSortedDong] = useState<Hangjungdong[]>();

  useEffect(() => {
    if (sidoValue) {
      setSortedSigugun(sigugun.filter(i => i.sido === sidoValue.sido));
    }
  }, [sidoValue, sigugun]);

  useEffect(() => {
    if (sigugunValue) {
      setSortedDong(
        dong.filter(
          i =>
            i.sigugun === sigugunValue.sigugun && i.sido === sigugunValue.sido,
        ),
      );
    }
  }, [sigugunValue, dong]);

  return (
    <LayoutContainer>
      <Stack space={'10px'}>
        <SelectButtonForm selectorName={sidoValue?.name} onPress={onOpen} />
        {sigugunValue && (
          <SelectButtonForm
            selectorName={sigugunValue?.name ?? ''}
            onPress={onSigugunOpen}
          />
        )}
        {dongValue && (
          <SelectButtonForm
            selectorName={dongValue?.name ?? ''}
            onPress={onDongOpen}
          />
        )}
      </Stack>

      <AddressSidoDrawer
        isOpen={isOpen}
        onClose={onClose}
        onPress={() => {
          onSigugunOpen();
        }}
        setSidoValue={setSidoValue}
        sidoValue={sidoValue}
      />
      <AddressSigugunDrawer
        isOpen={isSigugunOpen}
        onClose={onSigugunClose}
        onPress={() => onDongOpen()}
        setSigugunValue={setSigugunValue}
        sortedSigugun={sortedSigugun ?? []}
        sigugunValue={sigugunValue}
      />
      <AddressDongDrawer
        isOpen={isDongOpen}
        onClose={onDongClose}
        onPress={() => {
          onClose();
          onSigugunClose();
          onDongClose();
        }}
        sortedDong={sortedDong ?? []}
        setDongValue={setDongValue}
        dongValue={dongValue}
      />

      <Stack pb={'40px'} w={'100%'} position={'absolute'} bottom={0}>
        <Button
          handlePress={handlePage}
          large
          active={
            !_.isEmpty(sidoValue) &&
            !_.isEmpty(sigugunValue) &&
            !_.isEmpty(dongValue)
          }
          shadow
          text={'다음'}
          fontColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
          buttonColors={{
            active: colors.fussOrange[0],
            disabled: colors.fussOrange['-30'],
          }}
          borderColors={{
            active: colors.grayScale[90],
            disabled: colors.grayScale[50],
          }}
        />
      </Stack>
    </LayoutContainer>
  );
}

export default Address;
