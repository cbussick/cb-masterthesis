import { CBImage } from "@/components/CBImage/CBImage";
import { Card, Stack, Typography } from "@mui/material";
import { CBExerciseSequenceEndCardProps } from "./CBExerciseSequenceEndCardInterfaces";

export const CBExerciseSequenceEndCard = ({
  image,
  text,
}: CBExerciseSequenceEndCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        height: 100,
        display: "flex",
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        sx={{
          flex: 1,
        }}
      >
        <CBImage
          image={image}
          boxProps={{
            sx: {
              width: 150,
              height: "100%",
            },
          }}
          imageElementProps={{
            style: {
              objectFit: "cover",
            },
          }}
        />

        <Typography
          variant="h4"
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
