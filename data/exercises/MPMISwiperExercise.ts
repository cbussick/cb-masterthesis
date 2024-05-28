import { MPMIImgWithAlt } from "@/helpers/MPMIImgWithAlt";
import { MPMITopic } from "../topics";
import { MPMIExerciseType } from "./MPMIExerciseType";
import { MPMIExerciseWithTypeAndTopic } from "./MPMIExerciseWithType";

export enum MPMISwiperCellType {
  Plant = "plant",
  Animal = "animal",
  Both = "both",
}

interface MPMISwiperCellTypeData {
  name: string;
}

export const swiperCellTypes: Record<
  MPMISwiperCellType,
  MPMISwiperCellTypeData
> = {
  [MPMISwiperCellType.Plant]: { name: "Pflanzliche Zelle" },
  [MPMISwiperCellType.Animal]: { name: "Tierische Zelle" },
  [MPMISwiperCellType.Both]: { name: "Beides" },
};

export interface MPMISwiperExercise extends MPMIExerciseWithTypeAndTopic {
  id: string;
  name: string;
  image?: MPMIImgWithAlt;
  belongsTo: MPMISwiperCellType;
  hint: string;
}

export const swiperExercises: MPMISwiperExercise[] = [
  {
    id: "swiper-1",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Golgi-Apparat",
    image: { src: "/cell-organelles/golgi-apparat.png", alt: "Golgi-Apparat" },
    belongsTo: MPMISwiperCellType.Both,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },

  {
    id: "swiper-2",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Zellmembran",
    image: { src: "/cell-organelles/zellmembran-2.png", alt: "Zellmembran" },
    belongsTo: MPMISwiperCellType.Both,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },

  {
    id: "swiper-3",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Zellwand",
    image: { src: "/cell-organelles/zellwand.png", alt: "Zellwand" },
    belongsTo: MPMISwiperCellType.Plant,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },

  {
    id: "swiper-4",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Ribosom",
    image: { src: "/cell-organelles/ribosom.png", alt: "Ribosom" },
    belongsTo: MPMISwiperCellType.Both,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },

  {
    id: "swiper-5",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Vakuole",
    image: { src: "/cell-organelles/vakuole.png", alt: "Vakuole" },
    belongsTo: MPMISwiperCellType.Plant,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },

  {
    id: "swiper-6",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Zellplasma (Cytoplasma)",
    image: { src: "/cell-organelles/cytoplasma.png", alt: "Zellplasma" },
    belongsTo: MPMISwiperCellType.Both,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },

  {
    id: "swiper-7",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Plasmodesmen",
    image: { src: "/cell-organelles/plasmodesmen.png", alt: "Plasmodesmen" },
    belongsTo: MPMISwiperCellType.Plant,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },

  {
    id: "swiper-8",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Chloroplast",
    image: { src: "/cell-organelles/chloroplast.png", alt: "Chloroplast" },
    belongsTo: MPMISwiperCellType.Plant,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },

  {
    id: "swiper-9",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Zellkern",
    image: { src: "/cell-organelles/zellkern.png", alt: "Zellkern" },
    belongsTo: MPMISwiperCellType.Both,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },

  {
    id: "swiper-10",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Mitochondrium",
    image: { src: "/cell-organelles/mitochondrium.png", alt: "Mitochondrium" },
    belongsTo: MPMISwiperCellType.Both,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },

  {
    id: "swiper-11",
    type: MPMIExerciseType.Swiper,
    topic: MPMITopic.Zelle,
    name: "Endoplasmatisches Retikulum",
    image: {
      src: "/cell-organelles/endoplasmatisches-retikulum.png",
      alt: "Endoplasmatisches Retikulum",
    },
    belongsTo: MPMISwiperCellType.Both,
    hint: "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?",
  },
];
