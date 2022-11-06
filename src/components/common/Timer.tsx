import React, {useEffect, useState} from 'react';
import {Text} from 'native-base';

import {theme} from '~/theme/theme';

interface Props {
  start: boolean;
  time: number;
  handleTimeOver?: () => void;
}

/**
 * 타이머 분, 초를 보여주는 Text View
 * @param {boolean} start - 시작 여부
 * @param {number} time - 총 타이마 시간
 * @param {() => void} handleTimeOver - 시간 초과 되었을때 작동하는 핸들러
 */
function Timer({start, time, handleTimeOver = () => {}}: Props) {
  const [minute, setMinute] = useState(Math.trunc(time / 60));
  const [second, setSecond] = useState(time % 60);

  useEffect(() => {
    if (start) {
      const timer = setInterval(() => {
        setMinute(Math.trunc(time / 60));
        setSecond(time % 60);
        time--;

        if (time < 0) {
          handleTimeOver();
          clearInterval(timer);
        }
      }, 1000);
    }
  }, [start]);

  return (
    <Text fontSize={15} fontWeight={'400'} color={theme.colors.negative[0]}>
      {minute === 0 && second === 0
        ? '시간 초과'
        : ` ${minute}:${
            second === 0 ? '00' : second < 10 ? `0${second}` : second
          }`}
    </Text>
  );
}

export default Timer;
