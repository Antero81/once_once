import { useState, useCallback } from 'react';

const RATE_LIMIT_KEY = 'form_submission_timestamps';
const MAX_SUBMISSIONS = 5;
const WINDOW_MS = 3600000; // 1 hour

interface RateLimitResult {
  allowed: boolean;
  remainingTime?: number; // milliseconds until next submission allowed
  attemptsLeft?: number;
}

export const useRateLimit = () => {
  const [rateLimitError, setRateLimitError] = useState<string>('');

  const checkRateLimit = useCallback((): RateLimitResult => {
    try {
      const storedData = localStorage.getItem(RATE_LIMIT_KEY);
      const timestamps: number[] = storedData ? JSON.parse(storedData) : [];
      const now = Date.now();

      // Remove old timestamps outside the window
      const recentTimestamps = timestamps.filter((ts) => now - ts < WINDOW_MS);

      if (recentTimestamps.length >= MAX_SUBMISSIONS) {
        const oldestTimestamp = Math.min(...recentTimestamps);
        const remainingTime = WINDOW_MS - (now - oldestTimestamp);

        setRateLimitError(
          `Too many submissions. Please try again in ${Math.ceil(remainingTime / 60000)} minutes.`
        );

        return {
          allowed: false,
          remainingTime,
          attemptsLeft: 0,
        };
      }

      setRateLimitError('');
      return {
        allowed: true,
        attemptsLeft: MAX_SUBMISSIONS - recentTimestamps.length,
      };
    } catch (error) {
      console.error('[RATE_LIMIT_ERROR]', error);
      // If localStorage fails, allow submission but log error
      return { allowed: true, attemptsLeft: MAX_SUBMISSIONS };
    }
  }, []);

  const recordSubmission = useCallback((): void => {
    try {
      const storedData = localStorage.getItem(RATE_LIMIT_KEY);
      const timestamps: number[] = storedData ? JSON.parse(storedData) : [];
      const now = Date.now();

      // Add new timestamp
      timestamps.push(now);

      // Keep only recent timestamps
      const recentTimestamps = timestamps.filter((ts) => now - ts < WINDOW_MS);

      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentTimestamps));
    } catch (error) {
      console.error('[RATE_LIMIT_STORAGE_ERROR]', error);
    }
  }, []);

  return {
    checkRateLimit,
    recordSubmission,
    rateLimitError,
    setRateLimitError,
  };
};
