import * as React from "react";
import { Grid } from "@mui/material";
import { StateType } from "./Tile";
import { StyledKeyButton } from "./Wordle.style";

const KEYS_VALUES: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

interface IKey {
  value: string;
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
}

interface IKeyboardProps {
  onLetterPress: (letter: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
}

const Keyboard: React.FC<IKeyboardProps> = ({
  onLetterPress,
  onBackspace,
  onSubmit,
}) => {
  const keyboardData: IKey[][] = [];
  KEYS_VALUES.map((row, rowIndex) => {
    keyboardData.push([]);
    row.map((value) => {
      const [_state, _setState] = React.useState<StateType>("untested");
      keyboardData[rowIndex].push({
        value: value,
        state: _state,
        setState: _setState,
      });
    });
  });

  return (
    <Grid container maxWidth={500} paddingTop="25px">
      {keyboardData.map((row, rowIndex) => {
        return (
          <Grid
            container
            key={rowIndex}
            columnSpacing="6px"
            marginY="3px"
            justifyContent="center"
          >
            {row.map((key, keyIndex) => {
              return (
                <Grid item key={keyIndex} alignSelf="center">
                  <StyledKeyButton
                    variant="contained"
                    color="success"
                    size="small"
                    disabled={key.state === "nonexist"}
                    onClick={() => {
                      if (key.value === "Enter") onSubmit();
                      else if (key.value === "Back") onBackspace();
                      else onLetterPress(key.value);
                    }}
                  >
                    {key.value}
                  </StyledKeyButton>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Keyboard;
