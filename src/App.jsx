
import { useEffect, useState } from "react";
import { useCallback } from "react";
import "./App.css";
import './components/Board.css';
import Cell from "./components/Cell";

// ? Use const value to avoid typos
const SIZE = 5;
const INITIAL_LIGHT_PROB = 0.25;

// Initialise a square matrix of random boolean based on input probability
const newGrid = () =>
    Array.from({ length: SIZE }).map(
        () => Array.from({ length: SIZE }).map(
            () => Math.random() < INITIAL_LIGHT_PROB
        )
    );

// ? Took out everything from Board.jsx - unnecessary nesting
function App() {
    const [grid, setGrid] = useState(newGrid);
    const [hasWon, setHasWon] = useState(false);

    // ? Check for winning condition only when any cell is clicked
    useEffect(() => {
        // Win condition: All lights are off
        let checkWin = grid.every(row => row.every(cell => !cell));
        if (checkWin !== hasWon) {
            setHasWon(checkWin);
        }
    }, [grid])

    // To toggle a light and its neighbors
    // ? Set grid state once instead of setting for every cell toggled
    // ? Use useCallback so it doesnt re-render, causing cell to re-render
    const toggleLight = useCallback((row, col) => {
        let currGrid = [...grid]; // ? Clone a copy to avoid mutation

        // If condition to handle corner lights
        currGrid[row][col] = !currGrid[row][col];         // Toggle current cell
        if (col < SIZE) currGrid[row][col + 1] = !currGrid[row][col + 1]; // Toggle Right
        if (col > 0) currGrid[row][col - 1] = !currGrid[row][col - 1];    // Toggle Left
        if (row < SIZE) currGrid[row + 1][col] = !currGrid[row + 1][col]; // Toggle Down
        if (row > 0  ) currGrid[row - 1][col] = !currGrid[row - 1][col];  // Toggle Up

        setGrid(currGrid);
    }, []);

    const gridDisplay = grid.map((row, rowIndex) => (
        <div key={rowIndex} className="Board-row">
            {row.map((col, colIndex) => (
                <Cell
                    key={`${rowIndex}_${colIndex}`}
                    isOn={col}
                    handleToggleLight={() => toggleLight(rowIndex, colIndex)} />
            ))}
        </div>
    ));

    return (
        <main className="App">
            <h1 className="App-h1"><span className="App-orange">LIGHTS</span>  <span className="App-blue">OUT</span></h1>
            <section className="Board">
                {hasWon ? (
                    <div className="Board-hasWon">Congratulations!</div>
                ) : gridDisplay}
            </section>
        </main>
    );
}

export default App;
