import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from '../contexts/ChallengesContext';


interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

const activityTime = 25;
const activityTimeInSeconds = activityTime * 60;

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: ChallengesProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(activityTimeInSeconds);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(activityTimeInSeconds);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  );
}