import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import useLocalStorage, { removeKey } from "../hooks/useLocalStorage";

const TEST_KEY = "test";

describe("useLocalStorage", () => {
    afterEach(() => {
        // Reset test storage after testing
        removeKey(TEST_KEY);
    });

    test("Should save initial value", () => {
        const { result } = renderHook(() => useLocalStorage(TEST_KEY, 0));
        const value = result.current[0];
        expect(value).toBe(0);
        if (window !== undefined) {
            expect(window.localStorage.getItem(TEST_KEY)).toBe("0");
        }
    });

    test("Should save new value", () => {
        const { result } = renderHook(() => useLocalStorage(TEST_KEY, 0));
        const setValue = result.current[1];
        act(() => {
            setValue(1);
        });
        if (window !== undefined) {
            expect(window.localStorage.getItem(TEST_KEY)).toBe("1");
        }
    });

    test("Should persist value", () => {
        const { result: result1 } = renderHook(() =>
            useLocalStorage(TEST_KEY, 0)
        );
        const setValue = result1.current[1];
        act(() => {
            setValue(2);
        });

        // Re-initialise storage
        renderHook(() => useLocalStorage(TEST_KEY, 0));
        if (window !== undefined) {
            expect(window.localStorage.getItem(TEST_KEY)).toBe("2");
        }
    });
});
