"use client";

import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBInfoCard } from "@/components/CBInfoCard/CBInfoCard";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { CBTopic } from "@/data/topics";
import { CBRoute } from "@/helpers/routes";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";

const commonGridItemProps: Grid2Props = {
  xs: 6,
  lg: 4,
};

export default function FreePractice() {
  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <CBPageHeader
        title="Freie Übung"
        subTitle="Hier kannst du deine Schwächen angehen und dein Wissen verbessern!"
      />

      <Grid container spacing={4}>
        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image={{
              src: "/topics/zelle.jpg",
              alt: "Zelle",
            }}
            text="Tierische und pflanzliche
            Zellen"
            href={`${CBRoute.FreieUebung}/${CBTopic.Zelle}`}
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image={{
              src: "/topics/mitose-meiose.png",
              alt: "Mitose und Meiose",
            }}
            text="Mitose und Meiose"
            href={`${CBRoute.FreieUebung}/${CBTopic.MitoseMeiose}`}
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image={{ src: "/topics/dna.png", alt: "DNA" }}
            text="Aufbau der DNA"
            href={`${CBRoute.FreieUebung}/${CBTopic.AufbauDNA}`}
          />
        </Grid>

        {false && (
          <Grid {...commonGridItemProps}>
            <CBInfoCard
              image={{ src: "/coming-soon.jpg", alt: "Coming soon" }}
              text="DNA-Replikation"
              disabled
            />
          </Grid>
        )}

        {false && (
          <Grid {...commonGridItemProps}>
            <CBInfoCard
              image={{ src: "/coming-soon.jpg", alt: "Coming soon" }}
              text="Proteinbiosynthese"
              disabled
            />
          </Grid>
        )}

        {false && (
          <Grid {...commonGridItemProps}>
            <CBInfoCard
              image={{ src: "/coming-soon.jpg", alt: "Coming soon" }}
              text="(Gen-) Mutationen"
              disabled
            />
          </Grid>
        )}
      </Grid>
    </CBContentWrapper>
  );
}
