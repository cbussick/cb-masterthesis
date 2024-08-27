import { Card, Stack, Typography } from "@mui/material";
import { CBImage } from "../CBImage/CBImage";
import { CBSimpleInfoCardProps } from "./CBSimpleInfoCardInterfaces";

export const CBSimpleInfoCard = ({
  title,
  subTitle,
  image,
}: CBSimpleInfoCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 150,
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: "center",
          width: "100%",
          height: "100%",
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

        <Stack
          spacing={0.7}
          sx={{
            width: "70%",
          }}
        >
          <Typography variant="h3">{title}</Typography>

          <Typography variant="body2">{subTitle}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
