import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FormSelect = ({
  labelName,
  listItem,
  value,
  handleChange,
  defaultValue,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{labelName}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {listItem?.map((item) => {
          return (
            <MenuItem
              value={item?.value}
              className="flex flex-row gap-2 pb-[100%]"
            >
              <img
                src={item.src}
                height={16}
                weight={16}
                alt={item.value}
                className="rounded-full h-[16px] "
              />
              <span>{item?.label}</span>
            </MenuItem>
          );
        })}
        {/* <MenuItem value="HI">HI</MenuItem> */}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
