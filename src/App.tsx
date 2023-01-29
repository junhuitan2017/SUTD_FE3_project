import {
    useEffect,
    useState,
    useTransition,
    useCallback,
    ReactNode,
    ReactElement,
    MouseEvent
} from "react";
import Cell from "./components/Cell";
import HowTo from "./components/HowTo";
import useLocalStorage, { LS_KEYS } from "./hooks/useLocalStorage";
import "./styles/App.scss";

// ? Use const value to avoid typos
const SIZE = 5;
const INITIAL_LIGHT_PROB = 0.25;
const MAIN_COLORS = [
    "rgb(18 231 231)", // Teal
    "rgb(255, 255, 153)", // Yellow
    "rgb(255, 153, 153)", // Pink
    "rgb(153, 255, 153)", // Light Green
    "rgb(153, 153, 255)", // Purple
    "rgb(255, 153, 255)" // Magenta
];

// ? Took out everything from Board.jsx - unnecessary nesting
const App = (): ReactElement => {
    const [colorIndex, setColorIndex] = useLocalStorage(LS_KEYS.COLOR_INDEX, 0);
    const [grid, setGrid] = useState<boolean[][]>([]);
    const [hasWon, setHasWon] = useState<boolean>(false);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        // Set to be use in CSS
        // TODO: Make it a state in future
        document.documentElement.style.setProperty("--size", SIZE.toString());
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--main-color",
            MAIN_COLORS[colorIndex]
        );
    }, [colorIndex]);

    useEffect(() => {
        // Switch hasWon back to false to restart game
        if (!hasWon) {
            // Initialise a square matrix of random boolean based on input probability
            // ? To generate the grid separately
            startTransition(() => {
                const newGrid = Array.from({ length: SIZE }).map(() =>
                    Array.from({ length: SIZE }).map(
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
        const checkWin = grid.every(row => row.every(cell => !cell));
        if (checkWin !== hasWon) {
            setHasWon(checkWin);
        }
    }, [grid, hasWon]);

    // To change the main color of the app
    const rotateTheme = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        const lastIdx = MAIN_COLORS.length - 1;
        if (e.type === "click") {
            // Left Click
            setColorIndex((prevIdx: number) =>
                prevIdx < lastIdx ? prevIdx + 1 : 0
            );
        } else if (e.type === "contextmenu") {
            // Right click
            setColorIndex((prevIdx: number) =>
                prevIdx > 0 ? prevIdx - 1 : lastIdx
            );
        }
        return false;
    };

    // To toggle a light and its neighbors
    // ? Set grid state once instead of setting for every cell toggled
    // ? Use useCallback so it doesnt re-render, causing cell to re-render
    const toggleLight = useCallback(
        (row: number, col: number) => {
            setGrid(prevGrid => {
                // ? Clone a copy to avoid mutation
                // ! [...prevGrid] only did a shallow copy
                const currGrid = prevGrid.map(arr => arr.slice());
                const gridSize = SIZE; // Taken from App.scss;

                // If condition to handle corner lights
                currGrid[row][col] = !currGrid[row][col]; // Toggle current cell
                if (col < gridSize - 1)
                    currGrid[row][col + 1] = !currGrid[row][col + 1]; // Toggle Right
                if (col > 0) currGrid[row][col - 1] = !currGrid[row][col - 1]; // Toggle Left
                if (row < gridSize - 1)
                    currGrid[row + 1][col] = !currGrid[row + 1][col]; // Toggle Down
                if (row > 0) currGrid[row - 1][col] = !currGrid[row - 1][col]; // Toggle Up

                return currGrid;
            });
        },
        [setGrid]
    );

    const renderDisplay = (): ReactNode => {
        if (isPending) {
            return <h2 className="board-word">Messing up the lights~</h2>;
        } else if (hasWon) {
            return <h2 className="board-word">Congratulations!</h2>;
        }
        return (
            <section data-testid="board" className="board">
                {grid.map((row, rowIndex) =>
                    row.map((col, colIndex) => (
                        <Cell
                            key={`${rowIndex}_${colIndex}`}
                            isOn={col}
                            row={rowIndex}
                            col={colIndex}
                            handleToggleLight={toggleLight}
                        />
                    ))
                )}
            </section>
        );
    };

    return (
        <main className="app">
            <h1 data-testid="title" className="app-h1">
                <span className="app-orange">LIGHTS</span>{" "}
                <span
                    className="app-blue"
                    onClick={rotateTheme}
                    onContextMenu={rotateTheme}>
                    OUT
                </span>
            </h1>
            {renderDisplay()}
            <HowTo />
        </main>
    );
};

export default App;
