import * as React from "react";
import { styled, Box, BoxProps, Button } from "@mui/material";
import { StateType } from "./Tile";

const COLOR_MAP: any = {
  untested: "transparent",
  nonexist: ["grey", "600"],
  misplaced: ["warning", "dark"],
  correct: ["success", "dark"],
};

interface IState extends BoxProps {
  state: StateType;
}

export const StyledTile = styled(Box)<IState>`
  ${({ theme, state }) => `
    vertical-align: middle;
    text-align: center;
    font-weight: 800;
    font-size: 2rem;
    text-transform: uppercase;

    width: 62px;
    height: 62px;
    box-sizing: border-box;
    color: ${theme.palette.text.primary};
    border: ${
      state === "untested" ? `2px solid ${theme.palette.grey["600"]}` : "none"
    };
    background: ${
      state === "untested"
        ? COLOR_MAP[state]
        : theme.palette[COLOR_MAP[state][0]][COLOR_MAP[state][1]]
    };
  `}
`;

export const StyledKeyButton = styled(Button)`
  padding: 15px;
  min-width: 44px;
`;
