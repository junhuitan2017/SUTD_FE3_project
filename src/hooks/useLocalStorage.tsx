import { useCallback, useEffect, useState } from "react";

export const LS_KEYS = {
    COLOR_INDEX: "COLOR_INDEX"
};

export const removeKey = (key: string) => {
    window?.localStorage.removeItem(key);
};

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Set subsequent values to LocalStorage
    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window?.localStorage.setItem(key, JSON.stringify(valueToStore));
        },
        [storedValue, key]
    );

    // Set initial value from LocalStorage if any
    useEffect(() => {
        const value = window?.localStorage.getItem(key);
        setValue(value ? JSON.parse(value) : initialValue);
    }, [initialValue, key, setValue]);

    return [storedValue, setValue] as const;
}
