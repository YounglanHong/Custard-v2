import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
// import { grey } from "@material-ui/core/colors";

//* material-UI style object
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8d6e63",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial_wrapper: {
    position: "relative",
    marginTop: theme.spacing(3),
    height: 100,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
    dialIcon: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
  },
}));

//* addCard component로 넘어가는 (+) 아이콘
export default function DeckSpeedDial({ action, actions }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.speedDial_wrapper}>
        <ThemeProvider theme={theme}>
          <SpeedDial
            ariaLabel="SpeedDial_deck"
            className={classes.speedDial}
            icon={
              <SpeedDialIcon className={classes.dialIcon} color="primary" />
            }
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name} //* action.name은 Card component에서 객체 참고
                icon={action.icon} //* action.icon은 Card component에서 객체 참고
                tooltipTitle={action.name}
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
        </ThemeProvider>
      </div>
    </div>
  );
}
