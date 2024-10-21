import { useCallback, useEffect, useState } from "react";

const useMode = () => {
    const [mode, setMode] = useState<"dark" | "light">("dark");

    const themeBtnClick = useCallback(() => {
        setMode(mode === "dark" ? "light" : "dark");
    }, [mode]);

    useEffect(() => {
        document
            .querySelector<HTMLButtonElement>("#theme-btn")
            ?.addEventListener("click", themeBtnClick);

        return () => {
            document
                .querySelector<HTMLButtonElement>("#theme-btn")
                ?.removeEventListener("click", themeBtnClick);
        };
    }, [themeBtnClick]);

    useEffect(() => {
        const m = document.firstElementChild!.getAttribute("data-theme");
        if (m === "dark" || m === "light") {
            setMode(m);
        }
    }, []);

    return mode;
};

export default useMode;
