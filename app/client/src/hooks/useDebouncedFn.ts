import {useCallback, useEffect, useRef} from "react";

type FnType = (...args: any[]) => void

export function useDebouncedFn<F extends FnType>(
  fn: F,
  timeMillis: number
): F {
  const timeoutRef = useRef<number | undefined>(undefined)

  const wrappedFn = useCallback<F>(((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    // @ts-ignore
    timeoutRef.current = setTimeout(() => {
      // what if this is a state update?
      fn(...args)
    }, timeMillis)
  }) as F, [fn])

  return wrappedFn
}
