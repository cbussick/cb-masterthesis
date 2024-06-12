import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { CBGlossarySearchBarProps } from "./CBGlossarySearchBarInterfaces";

export const CBGlossarySearchbar = ({
  onSearch,
}: CBGlossarySearchBarProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Box>
      <TextField
        sx={{ width: 635 }}
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
