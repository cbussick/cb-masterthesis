import { Box, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { CBExerciseSequenceEndCardProps } from "./CBExerciseSequenceEndCardInterfaces";

export const CBExerciseSequenceEndCard = ({
  image,
  alt,
  text,
}: CBExerciseSequenceEndCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        height: 100,
        display: "flex",
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        sx={{
          flex: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 150,
            alignItems: "center",
          }}
        >
          <Image
            src={image}
            alt={alt || ""}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Typography
          variant="h3"
          sx={{
            display: "flex",
            alignItems: "center",
            pr: 4,
          }}
        >
          {text}
        </Typography>
      </Stack>
    </Card>
  );
};
