"use client";

import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMIInfoCard } from "@/components/MPMIInfoCard/MPMIInfoCard";
import { MPMIPageHeader } from "@/components/MPMIPageHeader/MPMIPageHeader";
import { MPMITopic } from "@/data/topics";
import { MPMIRoute } from "@/helpers/routes";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";

const commonGridItemProps: Grid2Props = {
  xs: 6,
  lg: 4,
};

export default function FreePractice() {
  return (
    <MPMIContentWrapper bgcolor={(t) => t.palette.background.default}>
      <MPMIPageHeader
        title="Freie Übung"
        subTitle="Hier kannst du deine Schwächen angehen und dein Wissen verbessern!"
      />

      <Grid container spacing={4}>
        <Grid {...commonGridItemProps}>
          <MPMIInfoCard
            image="/topics/zelle.jpg"
            text="Tierische und pflanzliche
            Zellen"
            href={`${MPMIRoute.FreieUebung}/${MPMITopic.Zelle}`}
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <MPMIInfoCard
            image="/topics/mitose-meiose.png"
            text="Mitose und Meiose"
            href={`${MPMIRoute.FreieUebung}/${MPMITopic.MitoseMeiose}`}
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <MPMIInfoCard
            image="/topics/dna.png"
            text="Aufbau der DNA"
            href={`${MPMIRoute.FreieUebung}/${MPMITopic.AufbauDNA}`}
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <MPMIInfoCard
            image="/coming-soon/coming-soon.jpg"
            text="DNA-Replikation"
            disabled
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <MPMIInfoCard
            image="/coming-soon/coming-soon.jpg"
            text="Proteinbiosynthese"
            disabled
          />
        </Grid>

        <Grid {...commonGridItemProps}>
          <MPMIInfoCard
            image="/coming-soon/coming-soon.jpg"
            text="(Gen-) Mutationen"
            disabled
          />
        </Grid>
      </Grid>
    </MPMIContentWrapper>
  );
}
