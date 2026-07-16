import { useState, useEffect } from 'react';

/**
 * useDebounce — delays updating a value until after a specified delay.
 * Useful for reducing expensive operations (like preview rendering) during rapid input.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
