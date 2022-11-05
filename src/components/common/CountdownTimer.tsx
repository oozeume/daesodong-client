import {Text} from 'native-base';
import React, {useEffect, useState} from 'react';

interface Props {
  time: number;
}

/**
 *@description 카운드타운 컴포넌트
 *@param {number} time - 시간(초 단위)
 */

function CountdownTimer({time}: Props) {
  const minutesNumber = time / 60;
  const secondsNumber = time % 60;

  const [minutes, setMinutes] = useState<number>(minutesNumber);
  const [seconds, setSeconds] = useState<number>(secondsNumber);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <Text h={'22px'} fontSize={'14px'} color={'negative.0'}>
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  );
}

export default CountdownTimer;
