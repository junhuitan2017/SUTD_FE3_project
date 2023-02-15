import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Cell from "../components/Cell";

describe("Cell test", () => {
    test("Should have cell-on as class", () => {
        const { container: cell } = render(
            <Cell isOn={true} row={1} col={1} handleToggleLight={vi.fn()} />
        );

        expect(
            cell.firstElementChild?.classList.contains("cell-on")
        ).toBeTruthy();
    });
    test("Should have cell-off as class", () => {
        const { container: cell } = render(
            <Cell isOn={false} row={1} col={1} handleToggleLight={vi.fn()} />
        );

        expect(
            cell.firstElementChild?.classList.contains("cell-off")
        ).toBeTruthy();
    });
    test("Should have row, col as param for handleToggleLight", () => {
        const mockFn = vi.fn();
        const { getByTestId } = render(
            <Cell isOn={false} row={1} col={1} handleToggleLight={mockFn} />
        );

        fireEvent.click(getByTestId("cell"));
        expect(mockFn).toHaveBeenCalledWith(1, 1);
    });
});
