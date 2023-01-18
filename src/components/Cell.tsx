import { memo, ReactElement } from "react";

type CellProps = {
    isOn: boolean;
    row: number;
    col: number;
    handleToggleLight: (row: number, col: number) => void;
}

const Cell = ({ isOn, row, col, handleToggleLight }: CellProps): ReactElement => {
    return (
        <button
            className={"Cell " + (isOn ? "Cell-on" : "Cell-off")}
            onClick={() => handleToggleLight(row, col)}
        ></button>
    );
}

// ? Memoise Cell so they dont all re-render when a cell is clicked
export default memo(Cell);