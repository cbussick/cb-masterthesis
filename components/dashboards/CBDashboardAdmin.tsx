import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CBUserActionsBar } from "../CBUserActionsBar/CBUserActionsBar";
import { CBWelcomeBanner } from "../CBWelcomeBanner/CBWelcomeBanner";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export const CBDashboardAdmin = (): JSX.Element => {
  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <CBWelcomeBanner />

        <CBUserActionsBar />
      </Stack>

      <Typography
        sx={{
          fontSize: "75px !important",
        }}
      >
        🚧👷🏻‍♂️
      </Typography>

      <Typography>In Arbeit </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>

              <TableCell align="right">Calories</TableCell>

              <TableCell align="right">Fat&nbsp;(g)</TableCell>

              <TableCell align="right">Carbs&nbsp;(g)</TableCell>

              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell align="right">{row.calories}</TableCell>

                <TableCell align="right">{row.fat}</TableCell>

                <TableCell align="right">{row.carbs}</TableCell>

                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
