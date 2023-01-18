import React, { memo } from "react";

function Cell({ isOn, row, col, handleToggleLight }) {
    return (
        <button
            className={"Cell " + (isOn ? "Cell-on" : "Cell-off")}
            onClick={() => handleToggleLight(row, col)}
        ></button>
    );
}

// ? Memoise Cell so they dont all re-render when a cell is clicked
export default memo(Cell);