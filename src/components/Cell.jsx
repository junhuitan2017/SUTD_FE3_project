import React, { memo } from "react";

function Cell({ isOn, handleToggleLight }) {
    return (
        <button
            className={"Cell " + (isOn ? "Cell-on" : "Cell-off")}
            onClick={handleToggleLight}
        ></button>
    );
}

// ? Memoise Cell so they dont all re-render when a cell is clicked
export default memo(Cell);