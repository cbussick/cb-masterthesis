import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { MPMIGlossarySearchBarProps } from "./MPMIGlossarySearchBarInterfaces";

export const MPMIGlossarySearchbar = ({
  onSearch,
}: MPMIGlossarySearchBarProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Box bgcolor={(t) => t.palette.background.default}>
      <TextField
        sx={{
          width: "66%",
        }}
        placeholder="Suche im Glossar"
        onChange={(e) => {
          setInputValue(e.target.value);
          onSearch(e.target.value);
        }}
        value={inputValue}
        InputProps={{
          endAdornment: (
            <SearchIcon sx={{ color: (t) => t.palette.grey[700] }} />
          ),
        }}
      />
    </Box>
  );
};
