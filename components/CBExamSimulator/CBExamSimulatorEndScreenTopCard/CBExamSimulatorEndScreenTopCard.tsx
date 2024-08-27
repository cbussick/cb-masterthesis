import { CBImage } from "@/components/CBImage/CBImage";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { CBExamSimulatorEndScreenTopCardProps } from "./CBExamSimulatorEndScreenTopCardInterfaces";

export const CBExamSimulatorEndScreenTopCard = ({
  image,
  title,
  subTitle,
}: CBExamSimulatorEndScreenTopCardProps): JSX.Element => {
  return (
    <Card sx={{ display: "flex", height: 100, width: "100%" }}>
      <Stack direction="row">
        <CBImage
          image={image}
          boxProps={{ sx: { width: 150, height: "100%" } }}
          imageElementProps={{
            style: {
              objectFit: "cover",
            },
          }}
        />

        <CardContent>
          <Typography variant="h3">{title}</Typography>

          <Typography>{subTitle}</Typography>
        </CardContent>
      </Stack>
    </Card>
  );
};
