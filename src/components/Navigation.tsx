import * as React from "react";
import {
  Typography,
  IconButton,
  Dialog,
  Box,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Link,
  Divider,
} from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Close from "@mui/icons-material/Close";

interface INavProps {
  colorMode: string;
  onToggleColorMode: () => void;
}

const Navigation: React.FC<INavProps> = ({
  colorMode,
  onToggleColorMode,
  ...props
}) => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  return (
    <>
      <Box width="100%">
        <AppBar position="static" color="transparent">
          <Toolbar>
            <IconButton aria-label="help">
              <HelpOutlineOutlinedIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              fontWeight={800}
              sx={{ flexGrow: 1 }}
            >
              WORDLE
            </Typography>
            <IconButton aria-label="statistics">
              <BarChartIcon />
            </IconButton>
            <IconButton
              aria-label="settings"
              onClick={() => setSettingsOpen(true)}
            >
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Dialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Settings
            </Typography>
            <IconButton
              aria-label="close"
              onClick={() => setSettingsOpen(false)}
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>

        <List>
          <ListItem>
            <ListItemIcon>
              <HelpOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-hard-mode"
              primary="Hard Mode"
              secondary="Any revealed hints must be used in subsequent guesses"
            />
            <Switch
              edge="end"
              onChange={(event, checked) => {}}
              checked={false}
              inputProps={{
                "aria-labelledby": "switch-list-label-hard",
              }}
              disabled
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              {colorMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText id="switch-dark-mode" primary="Dark Theme" />
            <Switch
              edge="end"
              onChange={(event, checked) => onToggleColorMode()}
              checked={colorMode === "dark"}
              inputProps={{
                "aria-labelledby": "switch-list-label-bright",
              }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <HelpOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-contrast-mode"
              primary="Color Blind Mode"
              secondary="High contrast colors"
            />
            <Switch
              edge="end"
              onChange={(event, checked) => {}}
              checked={false}
              inputProps={{
                "aria-labelledby": "switch-list-label-contrast",
              }}
              disabled
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              id="feedback"
              primary="Feedback"
              secondary="High contrast colors"
              inset
            />
            <Typography>
              <Link>Email</Link> | <Link>Twitter</Link>
            </Typography>
          </ListItem>
        </List>
        <Divider />
        <Typography variant="caption" margin={1} marginLeft={9}>
          Privacy Policy Copyright 2021-2022. All Rights Reserved.
        </Typography>
      </Dialog>
    </>
  );
};

export default Navigation;
