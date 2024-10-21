import { useCallback, useRef } from "react";

export function useThrottle<T>(
    fn: (args: T) => void,
    durationMS: number // スロットルする時間
) {
    const timer = useRef<undefined | NodeJS.Timeout>();

    return useCallback(
        (args: T) => {
            if (timer.current) return; // すでにタイマーがセットされている場合は何もしない
            timer.current = setTimeout(() => {
                fn(args);
                timer.current = undefined; // タイマーをリセット
            }, durationMS);
        },
        [timer, fn, durationMS]
    );
}
