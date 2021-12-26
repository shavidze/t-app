import { useEffect, useRef } from "react";
import equal from "deep-equal";

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useIfChanged = <T>(value: T, dontCheckEmpty?: boolean) => {
  const prevValue = usePrevious(value);
  if (!prevValue && dontCheckEmpty) return false;
  return !equal(value, prevValue && prevValue);
};
