"use client";

import { getUsers } from "@/firebase-client/getUsers";
import { CBUserCustomData } from "@/firebase-client/userCustomDataConverter";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, deDE } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export const CBStudentDataTable = (): JSX.Element => {
  const [allUsersDataWithID, setAllUsersDataWithID] = useState<
    (CBUserCustomData & { id: string })[]
  >([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "", width: 30 },
    { field: "firstName", headerName: "Vorname", width: 130 },
    { field: "lastName", headerName: "Nachname", width: 130 },
    {
      field: "username",
      headerName: "Benutzername",
      width: 130,
    },
    {
      field: "points",
      headerName: "Punkte",
      width: 90,
    },
    {
      field: "completedExams",
      headerName: "Prüfungssimulationen",
      width: 200,
    },
    {
      field: "solvedExercises",
      headerName: "Freie Übungen",
      width: 200,
    },
  ];

  const getRows = () => {
    const allUsersData: CBUserCustomData[] = [];
    getUsers().then((users) => {
      const data = users.map((e) => e.data());
      // const id = users.map((e) => e.id);
      for (let index = 0; index < data.length; index += 1) {
        const singleUser = data[index];
        if (singleUser.role === "student") {
          allUsersData.push(singleUser);
        }
      }

      const tempArray = allUsersData.map((user, index) => ({
        ...user,
        id: (index + 1).toString(),
      }));
      setAllUsersDataWithID(tempArray);
    });
  };

  useEffect(() => {
    getRows();
  }, []);

  // OnClick Methode um zur Einzelübersicht zu kommen, P.S.: an der wird aktuell in einem anderen Ticket gearbeitet
  const onCellClick = () => {};

  return (
    <Box sx={{ width: "100%", height: "60%" }}>
      <DataGrid
        rows={allUsersDataWithID}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onCellClick={onCellClick}
        localeText={deDE.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
};
