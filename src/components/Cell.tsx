import { memo, ReactElement } from "react";

type CellProps = {
    isOn: boolean;
    row: number;
    col: number;
    handleToggleLight: (row: number, col: number) => void;
};

const Cell = ({
    isOn,
    row,
    col,
    handleToggleLight
}: CellProps): ReactElement => {
    return (
        <button
            data-testid="cell"
            className={"cell " + (isOn ? "cell-on" : "cell-off")}
            onClick={() => handleToggleLight(row, col)}></button>
    );
};

// ? Memoise Cell so they dont all re-render when a cell is clicked
export default memo(Cell);
