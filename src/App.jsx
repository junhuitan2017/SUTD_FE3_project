
import { useEffect, useState, useTransition, useCallback } from "react";
import vars from "./App.scss";
import Cell from "./components/Cell";

// ? Use const value to avoid typos
const INITIAL_LIGHT_PROB = 0.25;

// ? Took out everything from Board.jsx - unnecessary nesting
function App() {
    const [grid, setGrid] = useState([]);
    const [hasWon, setHasWon] = useState(false);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        // Switch hasWon back to false to restart game
        if (!hasWon) {
            // Initialise a square matrix of random boolean based on input probability
            // ? To generate the grid separately
            startTransition(() => {
                const newGrid = Array.from({ length: vars.size }).map(
                    () => Array.from({ length: vars.size }).map(
                        () => Math.random() < INITIAL_LIGHT_PROB
                    )
                );
                setGrid(newGrid);
            });
        }
    }, [hasWon]);

    // ? Check for winning condition only when any cell is clicked
    useEffect(() => {
        // Win condition: All lights are off
        let checkWin = grid.every(row => row.every(cell => !cell));
        if (checkWin !== hasWon) {
            setHasWon(checkWin);
        }
    }, [grid, hasWon]);

    // To toggle a light and its neighbors
    // ? Set grid state once instead of setting for every cell toggled
    // ? Use useCallback so it doesnt re-render, causing cell to re-render
    const toggleLight = useCallback((row, col) => {
        setGrid(prevGrid => {
            // ? Clone a copy to avoid mutation
            // ! [...prevGrid] only did a shallow copy
            let currGrid = prevGrid.map((arr) => arr.slice());
            let gridSize = vars.size; // Taken from App.scss;

            // If condition to handle corner lights
            currGrid[row][col] = !currGrid[row][col];                             // Toggle current cell
            if (col < gridSize - 1) currGrid[row][col + 1] = !currGrid[row][col + 1]; // Toggle Right
            if (col > 0) currGrid[row][col - 1] = !currGrid[row][col - 1];        // Toggle Left
            if (row < gridSize - 1) currGrid[row + 1][col] = !currGrid[row + 1][col]; // Toggle Down
            if (row > 0) currGrid[row - 1][col] = !currGrid[row - 1][col];        // Toggle Up

            return currGrid;
        });
    }, [setGrid]);

    const renderDisplay = () => {
        if (isPending) {
            return <div className="Board-word">Messing up the lights~</div>;
        } else if (hasWon) {
            return <div className="Board-word">Congratulations!</div>;
        }
        return (
            <section className="Board">
                {grid.map((row, rowIndex) => (
                    row.map((col, colIndex) => (
                        <Cell
                            key={`${rowIndex}_${colIndex}`}
                            isOn={col}
                            row={rowIndex}
                            col={colIndex}
                            handleToggleLight={toggleLight} />
                    ))
                ))}
            </section>
        );
    };

    return (
        <main className="App">
            <h1 className="App-h1"><span className="App-orange">LIGHTS</span>  <span className="App-blue">OUT</span></h1>
            {renderDisplay()}
        </main>
    );
}

export default App;
