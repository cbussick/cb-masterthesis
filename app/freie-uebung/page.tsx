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
            image="/topics/zelle.jpg"
            text="Tierische und pflanzliche
            Zellen"
            href={`${CBRoute.FreieUebung}/${CBTopic.Zelle}`}
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image="/topics/mitose-meiose.png"
            text="Mitose und Meiose"
            href={`${CBRoute.FreieUebung}/${CBTopic.MitoseMeiose}`}
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image="/topics/dna.png"
            text="Aufbau der DNA"
            href={`${CBRoute.FreieUebung}/${CBTopic.AufbauDNA}`}
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image="/coming-soon/coming-soon.jpg"
            text="DNA-Replikation"
            disabled
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image="/coming-soon/coming-soon.jpg"
            text="Proteinbiosynthese"
            disabled
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <CBInfoCard
            image="/coming-soon/coming-soon.jpg"
            text="(Gen-) Mutationen"
            disabled
          />
        </Grid>
      </Grid>
    </CBContentWrapper>
  );
}
