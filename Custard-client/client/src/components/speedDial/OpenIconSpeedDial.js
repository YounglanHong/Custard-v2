import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8d6e63",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: "default",
  },
}));

export default function OpenIconSpeedDial({ action, actions }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [hidden /*, setHidden*/] = React.useState(false);

  // const handleVisibility = () => {
  //   setHidden(prevHidden => !prevHidden);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={`${classes.speedDial} speedDial`}
          hidden={hidden}
          icon={<SpeedDialIcon color="primary" />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              id="speedDialAction"
              className="speedDial"
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </ThemeProvider>
    </div>
  );
}
