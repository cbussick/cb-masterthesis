import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { CBExamSimulatorTopCardProps } from "./CBExamSimulatorTopCardInterfaces";

export const CBExamSimulatorTopCard = ({
  image,
  title,
  subTitle,
}: CBExamSimulatorTopCardProps): JSX.Element => {
  return (
    <Card sx={{ display: "flex", height: 100, width: "100%" }}>
      <Stack direction="row">
        <Box
          sx={{
            position: "relative",
            width: 150,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <CardContent>
          <Typography variant="h3">{title}</Typography>

          <Typography>{subTitle}</Typography>
        </CardContent>
      </Stack>
    </Card>
  );
};
