import React from "react";
//import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
//import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
//import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import "../../styles/SelectLanguage.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//tesseract에서 지원하는 전체 언어: https://github.com/tesseract-ocr/tesseract/blob/master/doc/tesseract.1.asc#LANGUAGES
// cf. "equ" = math / equation detection mode
const LANG = [
  "ara",
  "ces",
  "chi_sim", //간자체
  "chi_tra", //정자체
  "deu",
  "eng",
  "fra",
  "ita",
  "jpn",
  "kor",
  "spa",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (e) => {
    setPersonName(e.target.value);
    console.log(e.target.value);
    props.selectLang(e.target.value);
  };

  //   const handleChangeMultiple = event => {
  //     const { options } = event.target;
  //     const value = [];
  //     for (let i = 0, l = options.length; i < l; i += 1) {
  //       if (options[i].selected) {
  //         value.push(options[i].value);
  //       }
  //     }
  //     setPersonName(value);
  //   };

  return (
    <div id="language-selector">
      {/* <FormControl className={classes.formControl}> */}
      {/* <InputLabel id="demo-mutiple-name-label">Name</InputLabel> */}
      {/* <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {names.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select> */}
      {/* </FormControl> */}
      {/* <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">language</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {LANG.map(function (name) {
              // console.log(name);
              return (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div id="language-guide">choose maximum 2 dominant languages</div>
      {/* <FormControl className={clsx(classes.formControl, classes.noLabel)}>
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {names.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      {/* <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Native
        </InputLabel>
        <Select
          multiple
          native
          value={personName}
          onChange={handleChangeMultiple}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {names.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl> */}
    </div>
  );
}

/*
import React from "react";
//import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
//import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
//import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//tesseract에서 지원하는 전체 언어: https://github.com/tesseract-ocr/tesseract/blob/master/doc/tesseract.1.asc#LANGUAGES
// cf. "equ" = math / equation detection mode
const LANG = [
  "ara",
  "ces",
  "chi_sim", //간자체
  "chi_tra", //정자체
  "deu",
  "eng",
  "fra",
  "ita",
  "jpn",
  "kor",
  "spa",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (e) => {
    setPersonName(e.target.value);
    console.log(e.target.value);
    props.selectLang(e.target.value);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">language</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {LANG.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>choose maximum 2 languages</div>
    </div>
  );
}
*/
