import {Stack, useDisclose} from 'native-base';
import React, {useEffect, useState} from 'react';
import AddressSidoDrawer, {Hangjungdong} from './addressSidoDrawer';
import AddressDongDrawer from './addressDongDrawer';
import AddressSigugunDrawer from './addressSigugunDrawer';
import {hangjungdong} from '~/utils/hangjungdong';
import SelectButtonForm from './SelectButtonForm';
import LayoutContainer from './LayoutContainer';

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
    <LayoutContainer buttonPress={handlePage}>
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
    </LayoutContainer>
  );
}

export default Address;
