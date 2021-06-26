import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

export default function BasicCheckbox({ action }) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = event => {
    setChecked(event.target.checked);
    console.log("this checkbox is checked!");
    console.log(event.target);
    console.log(event.target.parentElement.parentElement);
    console.log(event.target.parentNode.parentNode);
  };
  return (
    <Checkbox
      style={action === "select" ? {} : { display: "none" }}
      checked={checked}
      onChange={handleChange}
      color="default"
      value="default"
      inputProps={{ "aria-label": "checkbox with default color" }}
    />
  );
}
