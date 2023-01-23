import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import App from "../App";

describe("App test", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Should display title", () => {
        const title = screen.getByTestId("title");
        expect(title.textContent).toEqual("LIGHTS OUT");
    });

    test("Should change Cell class on click", () => {
        const cell = screen.getByTestId("board").firstElementChild;
        const beforeClass = cell?.className;
        if (cell) fireEvent.click(cell);
        const afterClass = cell?.className;
        expect(beforeClass).not.toEqual(afterClass);
    });
});
