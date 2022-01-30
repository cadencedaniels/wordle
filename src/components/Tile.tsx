import * as React from "react";
import { Grid } from "@mui/material";
import { StyledTile } from "./Wordle.style";

export type StateType = "untested" | "nonexist" | "misplaced" | "correct";

export interface ITileProps {
  /**
   * Letter value of this tile
   * @default undefined
   */
  value?: string;

  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;

  /**
   * Validation state of this tile
   * @default "untested"
   */
  state: StateType;

  setState: React.Dispatch<React.SetStateAction<StateType>>;
}

const Tile: React.FC<ITileProps> = ({ value, state, ...props }) => {
  // run tile animation
  React.useEffect(() => {}, [state]);

  return (
    <Grid item xs={1} display="table">
      <StyledTile state={state} display="table-cell">
        {value}
      </StyledTile>
    </Grid>
  );
};

export default Tile;
