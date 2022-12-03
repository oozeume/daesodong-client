import {Stack, useDisclose} from 'native-base';
import React, {useEffect, useState} from 'react';
import {hangjungdong} from '~/utils/hangjungdong';
import SelectButtonForm from './SelectButtonForm';
import LayoutContainer from './LayoutContainer';
import AddressDrawer, {Hangjungdong} from './AddressDrawer';
import _ from 'lodash';

interface Props {
  handlePage: () => void;
}

/**
 *@description 집사정보등록 - 주소
 */

function Address({handlePage}: Props) {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {sido, sigugun, dong} = hangjungdong;

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

  const [sortedSigugun, setSortedSigugun] = useState<
    Partial<Hangjungdong>[] | undefined
  >();
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
          item =>
            item.sigugun === sigugunValue.sigugun &&
            item.sido === sigugunValue.sido,
        ),
      );
    }
  }, [sigugunValue, dong]);

  return (
    <LayoutContainer
      buttonPress={handlePage}
      possibleButtonPress={!_.isNil(sidoValue && sigugunValue && dongValue)}>
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

      <AddressDrawer
        isOpen={isOpen}
        onClose={onClose}
        onPress={() => onSigugunOpen()}
        setValue={setSidoValue}
        sidoValue={sidoValue}
        selectableList={sido}
      />

      <AddressDrawer
        isOpen={isSigugunOpen}
        onClose={onSigugunClose}
        onPress={() => onDongOpen()}
        setValue={setSigugunValue}
        selectableList={sortedSigugun}
        sigugunValue={sigugunValue}
      />

      <AddressDrawer
        isOpen={isDongOpen}
        onClose={onDongClose}
        onPress={() => {
          onClose();
          onSigugunClose();
          onDongClose();
        }}
        setValue={setDongValue}
        selectableList={sortedDong}
        dongValue={dongValue}
      />
    </LayoutContainer>
  );
}

export default Address;
