import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { CBTopic } from "../topics";
import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithTypeAndTopic } from "./CBExerciseWithType";

const swiperHint =
  "Gucke dir die Zelle genau an und entscheide ob es sich um eine tierische oder pflanzliche Zelle handelt, oder vielleicht Beides?";

export enum CBSwiperCellType {
  Plant = "plant",
  Animal = "animal",
  Both = "both",
}

interface CBSwiperCellTypeData {
  name: string;
}

export const swiperCellTypes: Record<CBSwiperCellType, CBSwiperCellTypeData> = {
  [CBSwiperCellType.Plant]: { name: "Pflanzliche Zelle" },
  [CBSwiperCellType.Animal]: { name: "Tierische Zelle" },
  [CBSwiperCellType.Both]: { name: "Beides" },
};

export interface CBSwiperExercise extends CBExerciseWithTypeAndTopic {
  id: string;
  name: string;
  image?: CBImgWithAlt;
  belongsTo: CBSwiperCellType;
  hint: string;
}

export const swiperExercises: CBSwiperExercise[] = [
  {
    id: "swiper-1",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Golgi-Apparat",
    image: { src: "/cell-organelles/golgi-apparat.png", alt: "Golgi-Apparat" },
    belongsTo: CBSwiperCellType.Both,
    hint: swiperHint,
  },

  {
    id: "swiper-2",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Zellmembran",
    image: { src: "/cell-organelles/zellmembran-2.png", alt: "Zellmembran" },
    belongsTo: CBSwiperCellType.Both,
    hint: swiperHint,
  },

  {
    id: "swiper-3",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Zellwand",
    image: { src: "/cell-organelles/zellwand.png", alt: "Zellwand" },
    belongsTo: CBSwiperCellType.Plant,
    hint: swiperHint,
  },

  {
    id: "swiper-4",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Ribosom",
    image: { src: "/cell-organelles/ribosom.png", alt: "Ribosom" },
    belongsTo: CBSwiperCellType.Both,
    hint: swiperHint,
  },

  {
    id: "swiper-5",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Vakuole",
    image: { src: "/cell-organelles/vakuole.png", alt: "Vakuole" },
    belongsTo: CBSwiperCellType.Plant,
    hint: swiperHint,
  },

  {
    id: "swiper-6",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Zellplasma (Cytoplasma)",
    image: { src: "/cell-organelles/cytoplasma.png", alt: "Zellplasma" },
    belongsTo: CBSwiperCellType.Both,
    hint: swiperHint,
  },

  {
    id: "swiper-7",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Plasmodesmen",
    image: { src: "/cell-organelles/plasmodesmen.png", alt: "Plasmodesmen" },
    belongsTo: CBSwiperCellType.Plant,
    hint: swiperHint,
  },

  {
    id: "swiper-8",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Chloroplast",
    image: { src: "/cell-organelles/chloroplast.png", alt: "Chloroplast" },
    belongsTo: CBSwiperCellType.Plant,
    hint: swiperHint,
  },

  {
    id: "swiper-9",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Zellkern",
    image: { src: "/cell-organelles/zellkern.png", alt: "Zellkern" },
    belongsTo: CBSwiperCellType.Both,
    hint: swiperHint,
  },

  {
    id: "swiper-10",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Mitochondrium",
    image: { src: "/cell-organelles/mitochondrium.png", alt: "Mitochondrium" },
    belongsTo: CBSwiperCellType.Both,
    hint: swiperHint,
  },

  {
    id: "swiper-11",
    type: CBExerciseType.Swiper,
    topic: CBTopic.Zelle,
    name: "Endoplasmatisches Retikulum",
    image: {
      src: "/cell-organelles/endoplasmatisches-retikulum.png",
      alt: "Endoplasmatisches Retikulum",
    },
    belongsTo: CBSwiperCellType.Both,
    hint: swiperHint,
  },
];
