"use client";

import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMIUserCustomData } from "@/firebase/UserCustomDataConverter";
import { addPointsToUser } from "@/firebase/addPointsToUser";
import { getUserCustomData } from "@/firebase/getUserCustomData";
import { UsersQueryDocumentSnapshot, getUsers } from "@/firebase/getUsers";
import { unlockGlossaryEntry } from "@/firebase/unlockGlossaryEntry";
import { MPMIUserRole } from "@/firebase/userRole";
import { positiveIntegerRegex } from "@/helpers/regex";
import { Face } from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AddDataFormValues {
  uid: string;
  points: number;
}

interface SeeDataFormValues {
  uid: string;
}

export default function FirestoreTest() {
  const [achievedPoints, setAchievedPoints] = useState<number>(0);
  const [role, setRole] = useState<MPMIUserRole>();
  const [users, setUsers] = useState<UsersQueryDocumentSnapshot>();
  const [selectedSeeUser, setSelectedSeeUser] = useState<string>("");
  const [selectedAddUser, setSelectedAddUser] = useState<string>("");
  const [selectedGlossaryUser, setSelectedGlossaryUser] = useState<string>("");
  const [glossaryEntry, setGlossaryEntry] = useState<string>("");

  const {
    register: registerSeeData,
    handleSubmit: handleSubmitSeeData,
    formState: { errors: errorsSeeData },
    watch: watchSeeData,
  } = useForm<SeeDataFormValues>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AddDataFormValues>();

  const uidSeeData = watchSeeData("uid");

  const uid = watch("uid");
  const points = watch("points");

  const handleGetUserData = async () => {
    const userData = await getUserCustomData(uidSeeData);

    setAchievedPoints(userData.data()?.points || 0);
    setRole(userData.data()?.role);
  };

  const handleAddPoints = () => {
    addPointsToUser(uid, points);
  };

  const handleUnlockGlossaryEntry = () => {
    unlockGlossaryEntry(selectedGlossaryUser, glossaryEntry);
  };

  useEffect(() => {
    getUsers().then((rawUsers) => {
      const allUsers: MPMIUserCustomData[] = [];
      rawUsers.forEach((user) => allUsers.push(user.data()));
      setUsers(rawUsers);
    });
  }, []);

  return (
    <MPMIContentWrapper bgcolor={(t) => t.palette.background.default}>
      <Stack spacing={6}>
        <form onSubmit={handleSubmitSeeData(handleGetUserData)} noValidate>
          <Stack spacing={3} alignItems="center">
            <Stack spacing={4}>
              <Typography variant="h2">
                Guck dir die Daten eines Users an 📖
              </Typography>

              <Stack spacing={2} alignItems="center">
                <TextField
                  select
                  label="User"
                  value={selectedSeeUser}
                  sx={{ width: 300 }}
                  {...registerSeeData("uid", {
                    required: "Bitte wähle einen User aus",
                  })}
                  error={!!errorsSeeData.uid}
                  helperText={errorsSeeData.uid?.message}
                >
                  {users
                    ? users.map((user) => (
                        <MenuItem
                          key={user.id}
                          value={user.id}
                          onClick={() => setSelectedSeeUser(user.id)}
                        >
                          <Chip
                            icon={<Face />}
                            color="primary"
                            variant="outlined"
                            label={user.data().username}
                          />
                        </MenuItem>
                      ))
                    : []}
                </TextField>

                <TextField
                  label="Punkte"
                  type="number"
                  disabled
                  variant="filled"
                  value={achievedPoints}
                />

                <TextField
                  label="Rolle"
                  type="text"
                  disabled
                  variant="filled"
                  value={role || ""}
                />
              </Stack>
            </Stack>

            <Button type="submit">Daten anzeigen</Button>
          </Stack>
        </form>

        <Divider />

        <form onSubmit={handleSubmit(handleAddPoints)} noValidate>
          <Stack spacing={3} alignItems="center">
            <Stack spacing={4}>
              <Typography variant="h2">Gib einem User Punkte 🎮</Typography>

              <Stack spacing={2} alignItems="center">
                <TextField
                  select
                  label="User"
                  value={selectedAddUser}
                  sx={{ width: 300 }}
                  {...register("uid", {
                    required: "Bitte wähle einen User aus",
                  })}
                  error={!!errorsSeeData.uid}
                  helperText={errorsSeeData.uid?.message}
                >
                  {users
                    ? users.map((user) => (
                        <MenuItem
                          key={user.id}
                          value={user.id}
                          onClick={() => setSelectedAddUser(user.id)}
                        >
                          <Chip
                            icon={<Face />}
                            color="primary"
                            variant="outlined"
                            label={user.data().username}
                          />
                        </MenuItem>
                      ))
                    : []}
                </TextField>

                <TextField
                  label="Punkte"
                  type="number"
                  {...register("points", {
                    required: "Bitte gib eine Anzahl Punkte ein",
                    pattern: {
                      value: positiveIntegerRegex,
                      message: "Bitte gib eine ganze positive Zahl ein",
                    },
                  })}
                  error={!!errors.points}
                  helperText={errors.points?.message}
                />
              </Stack>
            </Stack>

            <Button type="submit">Punkte hinzufügen</Button>
          </Stack>
        </form>

        <Divider />

        <Stack>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h2">
              Schalte Glossareinträge für einen User frei 📚
            </Typography>

            <Stack spacing={2} alignItems="center">
              <TextField
                select
                label="User"
                value={selectedGlossaryUser}
                sx={{ width: 300 }}
              >
                {users
                  ? users.map((user) => (
                      <MenuItem
                        key={user.id}
                        value={user.id}
                        onClick={() => setSelectedGlossaryUser(user.id)}
                      >
                        <Chip
                          icon={<Face />}
                          color="primary"
                          variant="outlined"
                          label={user.data().username}
                        />
                      </MenuItem>
                    ))
                  : []}
              </TextField>

              <TextField
                onChange={(e) => {
                  setGlossaryEntry(e.target.value);
                }}
                label="Glossareinträge"
                type="text"
              />
            </Stack>

            <Button onClick={handleUnlockGlossaryEntry}>
              Einträge freischalten
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </MPMIContentWrapper>
  );
}
