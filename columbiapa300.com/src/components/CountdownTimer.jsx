import React, { useEffect, useState } from 'react';
import '../styles/home/countdown-timer.css';

const CountdownTimer = () => {
  const targetDate = new Date('2025-06-01T00:00:00'); // 🎯 Corrected deadline

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = +targetDate - +now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (
        Object.keys(newTimeLeft).length === 0 ||
        +targetDate - +new Date() <= 0
      ) {
        setIsTimeUp(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      {isTimeUp ? (
        <p className="countdown-finished">🎉 Voting is now open!</p>
      ) : (
        <p>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s until voting opens!
        </p>
      )}
    </div>
  );
};

export default CountdownTimer;
