import { useState, useEffect } from "react";

const useStickyState = (defaultValue: any, key: string) => {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    const stickyValue = localStorage.getItem(key);
    return stickyValue === null ? defaultValue : JSON.parse(stickyValue);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};

export default useStickyState;
