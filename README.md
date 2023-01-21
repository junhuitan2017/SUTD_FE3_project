# Final project for SUTD Frontend Tools 3
Objective: To improve a project with techniques learnt during the workshop

## Main improvements
1. Converting from ![image][Webpack badge] to ![image][Vite badge] for faster and more efficient build

[Webpack badge]: https://img.shields.io/badge/Webpack-1C78C0?style=for-the-badge&logo=webpack&logoColor=*ED5FA
[Vite badge]: https://img.shields.io/badge/Vite-6905F4?style=for-the-badge&logo=vite&logoColor=F0DB4F

2. Converting from ![image][JS badge] to ![image][TS badge] for better maintanability

[JS badge]: https://img.shields.io/badge/Javascript-323330?style=for-the-badge&logo=javascript&logoColor=F0DB4F
[TS badge]: https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white

3. Using ![image][Sass badge] for dynamic styling
   * Allow saving of variables and mixin, preventing duplicate of codes
    ``` scss
    $subColor: orange; // Just the color of "Light"
    $mainColor: rgb(18, 231, 231); // Color of "Out" and the lights

    @mixin textShadow($color) {
        text-shadow:
            0 0 42px $color,
            0 0 82px $color,
            0 0 92px $color,
            0 0 102px $color,
            0 0 151px $color;
    }

    $black: rgb(55, 55, 55);
    $white: white;
    ```

[Sass badge]: https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white

4. Restructuring of files
   * Add folders for better maintanability in the future (i.e components,styles,tests)

5. Usage of hooks
   * useTransition for grid for unblocking the UI when the grid is huge
    ``` typescript
    startTransition(() => {
        const newGrid = Array.from({ length: SIZE }).map(
            () => Array.from({ length: SIZE }).map(
                () => Math.random() < INITIAL_LIGHT_PROB
            )
        );
        setGrid(newGrid);
    });
    ```
   * Memoized Cell component so each instance will only re-render when it or its neighbour is clicked
    ``` typescript
    export default memo(Cell);
    ```
   * useCallback for toggleLight so it wont re-rendered everytime, leading to Cell component being re-rendered
    ``` typescript
    const toggleLight = useCallback((row: number, col: number) => {
      // Truncated code
      // ...
    }, [setGrid]);
    ```

---

# Lights Out Game

![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

Try it out:
[Current Version](https://junhuitan2017.github.io/SUTD_FE3_project/) | [Original](https://luciatruden.github.io/lights-out/)

## About this project

Classic Lights Out game built on React.

The aim of the game is to turn all the lights on the board off.

When you click on one light, it will toggle on/off that light and its 4 non-diagonal neighbours (N,S,E,W).

![image](https://user-images.githubusercontent.com/110251375/201321115-1daa4f59-14e1-4a47-ae8a-da309aeaec34.png)


This project is created with [Vite](https://vitejs.dev).


## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`

Deploys the build to github pages
Your app will be deployed with this url format: [https://<Your github username>.github.io/<Your repo name>/](https://junhuitan2017.github.io/SUTD_FE3_project/)
**Note: This URL is to be specified in [package.json](./package.json)

### Github action

Automatically deploy to github pages whenever any changes is push to the main branch
[Workflow is specified here](./.github/workflows/test-and-deploy.yml)
