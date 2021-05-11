import { useContext } from 'react';

import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

function splitInDigits(value: number) {
  return String(value).padStart(2, '0').split('');
}

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = splitInDigits(minutes);
  const [secondLeft, secondRight] = splitInDigits(seconds);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo Encerrado
          <img src="icons/check.svg" alt="Checked" />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
            type="button"
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            onClick={resetCountdown}
          >
            Abandonar Ciclo
          </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um Ciclo
            </button>
          )}
        </>
      )}

    </div>
  );
}