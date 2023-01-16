import React, { memo } from "react";
import './Cell.css';

function Cell(props){
    const { isOn, handleToggleLight } = props;
    return (
        <button 
            className={isOn?"Cell-on":"Cell-off"} 
            onClick={handleToggleLight}
        ></button>
    );
}

// ? Memoise Cell so they dont all re-render when a cell is clicked
export default memo(Cell);