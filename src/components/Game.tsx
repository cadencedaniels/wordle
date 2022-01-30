import * as React from "react";
import { Button, ButtonGroup, Grid } from "@mui/material";
import Tile, { ITileProps, StateType } from "./Tile";
import Keyboard from "./Keyboard";

const WORD = ["c", "h", "a", "r", "t"];

function getEmptyTiles(): ITileProps[] {
  const [v1, setV1] = React.useState<string | undefined>();
  const [s1, setS1] = React.useState<StateType>("untested");

  const [v2, setV2] = React.useState<string | undefined>();
  const [s2, setS2] = React.useState<StateType>("untested");

  const [v3, setV3] = React.useState<string | undefined>();
  const [s3, setS3] = React.useState<StateType>("untested");

  const [v4, setV4] = React.useState<string | undefined>();
  const [s4, setS4] = React.useState<StateType>("untested");

  const [v5, setV5] = React.useState<string | undefined>();
  const [s5, setS5] = React.useState<StateType>("untested");

  return [
    { value: v1, setValue: setV1, state: s1, setState: setS1 },
    { value: v2, setValue: setV2, state: s2, setState: setS2 },
    { value: v3, setValue: setV3, state: s3, setState: setS3 },
    { value: v4, setValue: setV4, state: s4, setState: setS4 },
    { value: v5, setValue: setV5, state: s5, setState: setS5 },
  ];
}

interface IAttempt {
  tiles: ITileProps[];
}

interface IGridData {
  activeAttempt: number;
  setActiveAttempt: React.Dispatch<React.SetStateAction<number>>;
  allAttempts: IAttempt[];
}

function checkAllTilesFilled(currentAttempt: IAttempt): boolean {
  let filled = true;
  currentAttempt.tiles.map((tile) => {
    if (!tile.value) {
      filled = false;
      return;
    }
  });
  return filled;
}

const Game: React.FC = () => {
  const [_activeAttempt, _setActiveAttempt] = React.useState<number>(1);
  const gridData: IGridData = {
    activeAttempt: _activeAttempt,
    setActiveAttempt: _setActiveAttempt,
    allAttempts: [
      { tiles: getEmptyTiles() },
      { tiles: getEmptyTiles() },
      { tiles: getEmptyTiles() },
      { tiles: getEmptyTiles() },
      { tiles: getEmptyTiles() },
      { tiles: getEmptyTiles() },
    ],
  };
  const getCurrentAttempt = (): IAttempt => {
    return gridData.allAttempts[gridData.activeAttempt - 1];
  };

  const getFirstEmptyTileIndex = (): number => {
    let firstEmpty = -1;
    getCurrentAttempt().tiles.forEach((tile, index) => {
      if (!tile.value) {
        firstEmpty = index;
        return;
      }
    });
    console.log(firstEmpty);
    return firstEmpty;
  };

  const handleLetterInput = (input: string): void => {
    const firstEmptyIndex = getFirstEmptyTileIndex();
    if (!checkAllTilesFilled(getCurrentAttempt()) && firstEmptyIndex > -1) {
      getCurrentAttempt().tiles[firstEmptyIndex].setValue(input);
    }
  };

  const handleBackspace = () => {
    const firstEmptyIndex = getFirstEmptyTileIndex();
    if (checkAllTilesFilled(getCurrentAttempt()))
      getCurrentAttempt().tiles[4].setValue(undefined);
    else if (firstEmptyIndex > -1)
      getCurrentAttempt().tiles[firstEmptyIndex - 1].setValue(undefined);
  };

  const handleSubmit = () => {
    if (checkAllTilesFilled(getCurrentAttempt())) {
      // console.log(gridData.activeAttempt);
      getCurrentAttempt().tiles.map((tile, index) => {
        const letter = tile.value || "";
        if (WORD[index] === letter) tile.setState("correct");
        else if (WORD.includes(letter)) tile.setState("misplaced");
        else tile.setState("nonexist");
      });
      gridData.setActiveAttempt(gridData.activeAttempt++);
      // console.log(gridData.activeAttempt);
      // console.log(currentAttempt);
    }
  };

  // add event listener for device keyboard
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === "Enter") handleSubmit();
      else if (e.key === "Backspace") handleBackspace();
      else if (e.key.length === 1) handleLetterInput(e.key);
    };
    window.addEventListener("keyup", handleKey);
    return () => window.removeEventListener("keyup", handleKey);
  }, []);

  const LetterGrid: React.FC = () => (
    <Grid container maxWidth={330}>
      {gridData.allAttempts.map((a, aIndex) => (
        <Grid
          container
          columns={5}
          columnSpacing="5px"
          key={aIndex}
          marginY="2.5px"
          flexDirection="row-reverse"
        >
          {a.tiles.map((tile, tIndex) => (
            <Tile
              value={tile.value}
              setValue={tile.setValue}
              state={tile.state}
              setState={tile.setState}
              key={`${aIndex}${tIndex}`}
            />
          ))}
        </Grid>
      ))}
      <Grid item xs={6} paddingTop="20px">
        <ButtonGroup variant="contained" aria-label="action buttons group">
          <Button onClick={() => handleLetterInput("a")}>Add</Button>
          <Button onClick={() => getFirstEmptyTileIndex()}>Back</Button>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );

  return (
    <>
      <LetterGrid />
      {/* <Keyboard
        onLetterPress={handleLetterInput}
        onBackspace={handleBackspace}
        onSubmit={handleSubmit}
      /> */}
    </>
  );
};

export default Game;
