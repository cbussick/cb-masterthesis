import SearchIcon from "@mui/icons-material/Search";
import { Box, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { MPMIGlossarySearchBarProps } from "./MPMIGlossarySearchBarInterfaces";

export const MPMIGlossarySearchbar = ({
  onSearch,
}: MPMIGlossarySearchBarProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const theme = useTheme();

  return (
    <Box
      bgcolor={(t) => t.palette.background.default}
      sx={{
        position: "sticky",
        top: -32,
        zIndex: 1,
      }}
    >
      <TextField
        sx={{
          width: "66%",
          paddingTop: 2,
          paddingBottom: 1.5,
        }}
        placeholder="Suche im Glossar"
        onChange={(e) => {
          setInputValue(e.target.value);
          onSearch(e.target.value);
        }}
        value={inputValue}
        InputProps={{
          endAdornment: <SearchIcon sx={{ color: theme.palette.grey[700] }} />,
        }}
      />
    </Box>
  );
};
