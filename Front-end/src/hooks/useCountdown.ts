import { useEffect, useState } from "react";

export function useCountdown(endTime: string) {
  function calculateTime() {
    const difference = Math.max(0, new Date(endTime).getTime() - Date.now());

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: difference === 0,
    };
  }

  const [time, setTime] = useState(calculateTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return time;
}
