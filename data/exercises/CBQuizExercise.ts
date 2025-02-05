import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { CBTopic } from "../topics";
import { CBAnswer } from "./CBAnswer";
import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithIDAndTypeAndTopic } from "./CBExerciseWithType";

export interface CBQuizExercise extends CBExerciseWithIDAndTypeAndTopic {
  question: string;
  image?: CBImgWithAlt;
  answers: CBAnswer[];
  correctAnswer: string;
  type: CBExerciseType.Quiz | CBExerciseType.AIQuiz;
  /**
   * The ID of the glossary definition that is associated with this exercise.
   */
  definitionId?: string;
}

export type CBQuizExerciseWithMetaData = CBQuizExercise & {
  isCompleted: boolean;
};

export const quizExercises: CBQuizExercise[] = [
  {
    id: "zelle-grundlagen-2",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie ist das Endoplasmatische Retikulum (ER) aufgebaut?",
    answers: [
      {
        id: "A",
        text: "Aus einem System von Membranen, die flache, miteinander verbundene Säckchen und Kanäle bilden",
      },
      {
        id: "B",
        text: "Aus einer einzigen Membranschicht, die das Zellinnere umgibt",
      },
      {
        id: "C",
        text: "Aus einer Doppelschicht von Lipiden, die Proteine umhüllt",
      },
      {
        id: "D",
        text: "Aus einer Ansammlung von Vesikeln, die durch Mikrotubuli miteinander verbunden sind",
      },
    ],
    correctAnswer: "A",
    definitionId: "endoplasmatisches retikulum",
  },
  {
    id: "zelle-grundlagen-3",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion des Endoplasmatischen Retikulums (ER)?",
    image: {
      src: "/cell-organelles/endoplasmatisches-retikulum.png",
      alt: "Endoplasmatisches Retikulum",
    },
    answers: [
      { id: "A", text: "Speicherung und Freisetzung von Enzymen" },
      { id: "B", text: "Proteinbiosynthese und Stoffwechselvorgänge" },
      { id: "C", text: "Kontrolle des Zellzyklus" },
      { id: "D", text: "Produktion von ATP (Adenosintriphosphat)" },
    ],
    correctAnswer: "B",
    definitionId: "endoplasmatisches retikulum",
  },
  {
    id: "zelle-grundlagen-4",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie ist das Mitochondrium aufgebaut?",
    answers: [
      {
        id: "A",
        text: "Aus einer äußeren Membran und einer gefalteten inneren Membran, die als Cristae bezeichnet wird",
      },
      { id: "B", text: "Aus einer einzigen Membran, die das Organell umgibt" },
      {
        id: "C",
        text: "Aus einer Doppelschicht von Lipiden, die das Organell umhüllt",
      },
      {
        id: "D",
        text: "Aus einem Netzwerk flacher, miteinander verbundener Säckchen",
      },
    ],
    correctAnswer: "A",
    definitionId: "mitochondrien",
  },
  {
    id: "zelle-grundlagen-5",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion eines Mitochondriums?",
    image: { src: "/cell-organelles/mitochondrium.png", alt: "Mitochondrium" },
    answers: [
      {
        id: "A",
        text: "Speicherung von genetischer Information zur Weitergabe an nachfolgende Generationen",
      },
      {
        id: "B",
        text: "Kontrolle der Zellteilung und Regulierung der Wachstumsprozesse in der Zelle",
      },
      {
        id: "C",
        text: "Energieerzeugung durch Zellatmung und Produktion von Adenosintriphosphat (ATP)",
      },
      {
        id: "D",
        text: "Produktion von Enzymen zur Unterstützung verschiedener Stoffwechselprozesse in der Zelle",
      },
    ],
    correctAnswer: "C",
    definitionId: "mitochondrien",
  },
  {
    id: "zelle-grundlagen-6",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie sind Plasmodesmen aufgebaut?",
    answers: [
      {
        id: "A",
        text: "Aus kleinen Vesikeln, die spezifische Proteine transportieren.",
      },
      {
        id: "B",
        text: "Aus einer Lipidschicht, die benachbarte Zellmembranen umgibt.",
      },
      {
        id: "C",
        text: "Aus engen Kanälen für den direkten Zellinhalt-Austausch.",
      },
      {
        id: "D",
        text: "Aus röhrenförmigen Strukturen für die Zellverbindung",
      },
    ],
    correctAnswer: "D",
  },
  {
    id: "zelle-grundlagen-7",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion von Plasmodesmen?",
    image: {
      src: "/cell-organelles/plasmodesmen.png",
      alt: "Plasmodesmen",
    },
    answers: [
      { id: "A", text: "Speicherung von Wasser in Pflanzenzellen" },
      { id: "B", text: "Produktion von Chlorophyll" },
      {
        id: "C",
        text: "Transport von Molekülen, Ionen und Signalen zwischen benachbarten Pflanzenzellen",
      },
      { id: "D", text: "Regulation des Zellzyklus in Pflanzenzellen" },
    ],
    correctAnswer: "C",
  },
  {
    id: "zelle-grundlagen-8",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie ist die Zellmembran aufgebaut?",
    answers: [
      {
        id: "A",
        text: "Aus einer Doppelschicht von Lipiden, in die Proteine eingebettet sind",
      },
      {
        id: "B",
        text: "Aus einer einzelnen Lipidschicht, die Proteine umhüllt",
      },
      {
        id: "C",
        text: "Aus einer festen, undurchlässigen Schicht aus Proteinen",
      },
      {
        id: "D",
        text: "Aus einer einfachen Lipidschicht, die die Zelle umgibt",
      },
    ],
    correctAnswer: "A",
  },
  {
    id: "zelle-grundlagen-9",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion der Zellmembran?",
    image: { src: "/cell-organelles/zellmembran.png", alt: "Zellmembran" },
    answers: [
      { id: "A", text: "Zellteilung" },
      { id: "B", text: "Speicherung der genetischen Informationen" },
      {
        id: "C",
        text: "Regulation des Stofftransport und Schutz der Zelle.",
      },
      { id: "D", text: "Produktion von Enzymen für den Zellstoffwechsel" },
    ],
    correctAnswer: "C",
  },
  {
    id: "zelle-grundlagen-10",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie ist das Zellplasma aufgebaut?",
    answers: [
      {
        id: "A",
        text: "Besteht aus einer Lipidschicht, die das Organell umgibt",
      },
      {
        id: "B",
        text: "Enthält wässrige Zellflüssigkeit und das feste Zellskelett (Cytoskelett)",
      },
      {
        id: "C",
        text: "Besteht aus einer geleeartigen Substanz ohne klare Struktur",
      },
      { id: "D", text: "Ist eine Ansammlung von Vesikeln und Bläschen" },
    ],
    correctAnswer: "B",
  },
  {
    id: "zelle-grundlagen-11",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion des Zellplasmas?",
    answers: [
      { id: "A", text: "Energieerzeugung" },
      {
        id: "B",
        text: "Ort für grundlegende chemische Vorgänge und Stabilisierung der Zelle für Transportvorgänge",
      },
      { id: "C", text: "Regulation des Zellzyklus" },
      { id: "D", text: "Speicherort für genetische Informationen" },
    ],
    correctAnswer: "B",
  },
  {
    id: "zelle-grundlagen-12",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie ist der Zellkern aufgebaut?",
    answers: [
      {
        id: "A",
        text: "Aus einer Lipidschicht, die den Zellkern umhüllt und seine Integrität aufrechterhält.",
      },
      {
        id: "B",
        text: "Aus einer dichten Proteinstruktur, die den Kern formt und seine Stabilität gewährleistet.",
      },
      {
        id: "C",
        text: "Aus einer Doppelmembran mit Kernporen, die im Inneren Chromosomen enthält mit den genetischen Informationen",
      },
      {
        id: "D",
        text: "Aus einer Ansammlung von Vesikeln und Bläschen, die verschiedene Funktionen im Kern ausführen.",
      },
    ],
    correctAnswer: "C",
    definitionId: "zellkern",
  },
  {
    id: "zelle-grundlagen-13",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion des Zellkerns?",
    image: { src: "/cell-organelles/zellkern.png", alt: "Zellkern" },
    answers: [
      {
        id: "A",
        text: "Speicherort der DNA und Steuerung der Zellaktivitäten",
      },
      { id: "B", text: "Energieerzeugung für die Zelle" },
      { id: "C", text: "Regulation des Stofftransports in und aus der Zelle" },
      { id: "D", text: "Speicherort von Enzymen für den Zellstoffwechsel" },
    ],
    correctAnswer: "A",
    definitionId: "zellkern",
  },

  {
    id: "zelle-grundlagen-14",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie ist das Ribosom aufgebaut?",
    answers: [
      {
        id: "A",
        text: "Aus einer einzelnen Lipidschicht, die Proteine umhüllt",
      },
      { id: "B", text: "Aus festen, dichten Partikeln aus Nukleinsäuren" },
      { id: "C", text: "Aus einer Ansammlung von Vesikeln und Bläschen" },
      { id: "D", text: "Aus Ribonukleinsäure (RNA) und Proteinen" },
    ],
    correctAnswer: "D",
    definitionId: "ribosomen",
  },
  {
    id: "zelle-grundlagen-15",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion des Ribosoms?",
    image: { src: "/cell-organelles/ribosom.png", alt: "Ribosom" },
    answers: [
      { id: "A", text: "Ort der Proteinbiosynthese" },
      { id: "B", text: "Produktion von Lipiden in der Zelle" },
      { id: "C", text: "Regulation des Zellzyklus" },
      { id: "D", text: "Verdauung von Nährstoffen" },
    ],
    correctAnswer: "A",
    definitionId: "ribosomen",
  },
  {
    id: "zelle-grundlagen-16",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie ist der Golgi-Apparat aufgebaut?",
    answers: [
      { id: "A", text: "Aus Membranstapeln als Teil des Membransystems" },
      {
        id: "B",
        text: "Aus vielen einzelnen Ribosomen, die durch Molekülketten verbunden sind",
      },
      { id: "C", text: "Aus Proteinen und Ribonukleinsäuren (RNA)" },
      { id: "D", text: "Aus Cytoskelett und Vesikeln" },
    ],
    correctAnswer: "A",
    definitionId: "golgi-apparat",
  },
  {
    id: "zelle-grundlagen-17",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion des Golgi-Apparats?",
    image: { src: "/cell-organelles/golgi-apparat.png", alt: "Golgi-Apparat" },
    answers: [
      { id: "A", text: "Zellatmung" },
      { id: "B", text: "Stofftransport, Stoffaufnahme und Stoffabgabe" },
      { id: "C", text: "Schutz und Stabilität der Zelle" },
      { id: "D", text: "Proteinbiosynthese" },
    ],
    correctAnswer: "B",
    definitionId: "golgi-apparat",
  },
  {
    id: "zelle-grundlagen-18",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie ist ein Chloroplast aufgebaut?",
    answers: [
      { id: "A", text: "Aus einer komplexen Molekülstruktur" },
      {
        id: "B",
        text: "Aus Aminosäuren, die durch Molekülbrücken verbunden sind",
      },
      {
        id: "C",
        text: "Aus einem Pigment namens Chlorophyll, das für die Photosynthese verantwortlich ist",
      },
      {
        id: "D",
        text: "Aus einer Doppelmembran, wo die äußere Membran eine glatte Oberfläche besitzt und die innere zahlreiche Einstülpungen",
      },
    ],
    correctAnswer: "D",
    definitionId: "chloroplasten",
  },
  {
    id: "zelle-grundlagen-19",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion eines Chloroplasten?",
    image: { src: "/cell-organelles/chloroplast.png", alt: "Chloroplast" },
    answers: [
      { id: "A", text: "Fotosynthese und Zellatmung" },
      { id: "B", text: "Zellatmung und Stofftransport" },
      { id: "C", text: "Fotosynthese" },
      { id: "D", text: "Stofftransport" },
    ],
    correctAnswer: "C",
    definitionId: "chloroplasten",
  },
  {
    id: "zelle-grundlagen-20",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie ist die Zellwand aufgebaut?",
    answers: [
      { id: "A", text: "Aus einer einfachen Lipidschicht" },
      { id: "B", text: "Aus einer doppelten Membranschicht" },
      { id: "C", text: "Aus Phosphatresten" },
      { id: "D", text: "Aus Cellulose" },
    ],
    correctAnswer: "D",
  },
  {
    id: "zelle-grundlagen-21",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion einer Zellwand?",
    image: {
      src: "/cell-organelles/zellwand.png",
      alt: "Zellwand",
    },
    answers: [
      { id: "A", text: "Schutz, Stabilität und Struktur" },
      { id: "B", text: "Stoffaufnahme und Stofftransport" },
      { id: "C", text: "Stoffwechselvorgänge und Entgiftung" },
      { id: "D", text: "Fotosynthese" },
    ],
    correctAnswer: "A",
  },
  {
    id: "zelle-grundlagen-22",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Wie ist die Vakuole aufgebaut?",
    answers: [
      {
        id: "A",
        text: "Aus einer einzigen Lipidschicht, die das Organell umhüllt",
      },
      {
        id: "B",
        text: "Von einer Membran (Tonoplast) umgeben und enthält hauptsächlich Wasser",
      },
      { id: "C", text: "Aus einer festen, kompakten Struktur aus Proteinen" },
      { id: "D", text: "Aus einem flüssigkeitsgefüllten Raum im Zellplasma" },
    ],
    correctAnswer: "B",
    definitionId: "vakuolen",
  },
  {
    id: "zelle-grundlagen-23",
    type: CBExerciseType.Quiz,
    topic: CBTopic.Zelle,
    question: "Was ist die Funktion der Vakuole?",
    image: { src: "/cell-organelles/vakuole.png", alt: "Vakuole" },
    answers: [
      { id: "A", text: "Ort der Proteinbiosynthse und Proteinspeicherung" },
      { id: "B", text: "Regulation des Zellvolumens und der Zellstabilität" },
      {
        id: "C",
        text: "Speicherort von Stoffen und Regulation des Wasserhaushaltes der Zelle",
      },
      { id: "D", text: "Ort der Fotosynthese" },
    ],
    correctAnswer: "C",
    definitionId: "vakuolen",
  },
  {
    id: "mitose-meiose-1",
    type: CBExerciseType.Quiz,
    topic: CBTopic.MitoseMeiose,
    question: "In welcher Zellorganelle findet die Mitose statt?",
    answers: [
      { id: "A", text: "Zellkern" },
      { id: "B", text: "Mitochondrien" },
      {
        id: "C",
        text: "Zellmembran",
      },
      { id: "D", text: "Endoplasmatisches Retikulum" },
    ],
    correctAnswer: "A",
  },
  {
    id: "mitose-meiose-3",
    type: CBExerciseType.Quiz,
    topic: CBTopic.MitoseMeiose,
    question: "Welche Aufgabe hat die Mitose?",
    image: { src: "/cell-division/mitosis/mitose.png", alt: "Mitose" },
    answers: [
      { id: "A", text: "Die Produktion von Keimzellen für die Fortpflanzung" },
      { id: "B", text: "Die Reparatur beschädigter genetischer Informationen" },
      {
        id: "C",
        text: "Die Zellteilung zur Bildung von genetisch identischen Tochterzellen",
      },
      { id: "D", text: "Die Produktion von Energie in der Zelle" },
    ],
    correctAnswer: "C",
    definitionId: "mitose",
  },
  {
    id: "mitose-meiose-4",
    type: CBExerciseType.Quiz,
    topic: CBTopic.MitoseMeiose,
    question: "Was läuft in der Prophase ab?",
    answers: [
      {
        id: "A",
        text: "Die Chromosomen werden entwirrt und erscheinen als lange Fäden",
      },
      { id: "B", text: "Die Zellmembran teilt sich" },
      {
        id: "C",
        text: "Die Chromosomen bewegen sich zur Mitte der Zelle",
      },
      {
        id: "D",
        text: "Die Zellteilung ist abgeschlossen und zwei Tochterzellen entstehen",
      },
    ],
    correctAnswer: "A",
    definitionId: "prophase",
  },
  {
    id: "mitose-meiose-5",
    type: CBExerciseType.Quiz,
    topic: CBTopic.MitoseMeiose,
    question: "Was läuft in der Metaphase ab?",
    answers: [
      {
        id: "A",
        text: "Die Chromosomen ordnen sich in der Äquatorialebene an",
      },
      { id: "B", text: "Die Zellmembran teilt sich" },
      {
        id: "C",
        text: "Die Chromosomen werden entwirrt und erscheinen als lange Fäden",
      },
      {
        id: "D",
        text: "Die Chromatiden der Chromosomen werden zu den entgegengesetzten Polen der Zelle gezogen",
      },
    ],
    correctAnswer: "A",
    definitionId: "metaphase",
  },
  {
    id: "mitose-meiose-6",
    type: CBExerciseType.Quiz,
    topic: CBTopic.MitoseMeiose,
    question: "Was läuft in der Anaphase ab?",
    answers: [
      { id: "A", text: "Die Chromosomen bewegen sich zur Mitte der Zelle" },
      { id: "B", text: "Die Zellmembran teilt sich" },
      {
        id: "C",
        text: "Die Chromosomen werden entwirrt und erscheinen als lange Fäden",
      },
      {
        id: "D",
        text: "Die Chromatiden werden zu den entgegengesetzten Polen der Zelle gezogen",
      },
    ],
    correctAnswer: "D",
    definitionId: "anaphase",
  },
  {
    id: "mitose-meiose-7",
    type: CBExerciseType.Quiz,
    topic: CBTopic.MitoseMeiose,
    question: "Was läuft in der Telophase ab?",
    answers: [
      { id: "A", text: "Die Chromosomen bewegen sich zur Mitte der Zelle" },
      { id: "B", text: "Die Zellmembran teilt sich" },
      {
        id: "C",
        text: "Die Chromosomen werden entwirrt und erscheinen als lange Fäden",
      },
      {
        id: "D",
        text: "Die Chromatiden der Chromosomen werden zu den entgegengesetzten Polen der Zelle gezogen",
      },
    ],
    correctAnswer: "B",
    definitionId: "telophase",
  },
  {
    id: "mitose-meiose-8",
    type: CBExerciseType.Quiz,
    topic: CBTopic.MitoseMeiose,
    question: "Was läuft in der Interphase ab?",
    answers: [
      { id: "A", text: "Die Zelle teilt sich in zwei Tochterzellen" },
      {
        id: "B",
        text: "Die Chromosomen werden dupliziert, Zellwachstum und Vorbereitung auf die Zellteilung finden statt",
      },
      {
        id: "C",
        text: "Die Zelle wird auf den Tod vorbereitet",
      },
      { id: "D", text: "Die Chromosomen werden getrennt" },
    ],
    correctAnswer: "B",
    definitionId: "interphase",
  },
  {
    id: "mitose-meiose-9",
    type: CBExerciseType.Quiz,
    topic: CBTopic.MitoseMeiose,
    question: "Welche Aufgabe hat die Meiose?",
    image: {
      src: "/cell-division/meiosis/meiose-unbeschriftet.png",
      alt: "Meiose I und Meiose II in alle Phasen aufgeteilt",
    },
    answers: [
      {
        id: "A",
        text: "Die Produktion von Energie in der Zelle für die DNA-Reparatur",
      },
      { id: "B", text: "Die Reparatur beschädigter DNA" },
      {
        id: "C",
        text: "Die Produktion von Keimzellen mit haploidem Chromosomensatz für die sexuelle Fortpflanzung.",
      },
      { id: "D", text: "Die Zellteilung zur Bildung von Tochterzellen" },
    ],
    correctAnswer: "C",
    definitionId: "meiose",
  },
  {
    id: "mitose-meiose-10",
    type: CBExerciseType.Quiz,
    topic: CBTopic.MitoseMeiose,
    question: "Was ist das Ergebnis der Mitose?",
    image: {
      src: "/cell-division/mitosis/mitose.png",
      alt: "Mitosephasen: Interphase, Prophase, Metaphase, Anaphase, Telophase",
    },
    answers: [
      {
        id: "A",
        text: "Die Bildung von zwei Tochterzellen mit halber Chromosomenanzahl und genetischer Variation",
      },
      {
        id: "B",
        text: "Die Produktion von Keimzellen für die sexuelle Fortpflanzung",
      },
      {
        id: "C",
        text: "Die Bildung von vier haploiden Zellen mit unterschiedlichen genetischen Informationen",
      },
      {
        id: "D",
        text: "Die Bildung von zwei genetisch identischen Tochterzellen mit gleichem Chromosomensatz wie die Ausgangszelle",
      },
    ],
    correctAnswer: "D",
    definitionId: "mitose",
  },
  {
    id: "mitose-meiose-11",
    type: CBExerciseType.Quiz,
    topic: CBTopic.MitoseMeiose,
    question: "Welche Merkmale hat die Meiose bei Mann und Frau?",
    image: {
      src: "/cell-division/meiosis/meiose-unbeschriftet.png",
      alt: "Meiose I und Meiose II in alle Phasen aufgeteilt",
    },
    answers: [
      {
        id: "A",
        text: "Frauen: Eine große Eizelle und drei kleine Polkörperchen, Männer: Vier gleich große Spermien",
      },
      {
        id: "B",
        text: "Frauen: Vier gleich große Eizellen, Männer: Vier gleich große Spermien",
      },
      {
        id: "C",
        text: "Frauen: Vier gleich große Spermien, Männer: Vier gleich große Eizellen",
      },
      {
        id: "D",
        text: "Frauen: Vier gleich große Eizellen, Männer: Eine große Spermie und drei winzige Nebenkörperchen",
      },
    ],
    correctAnswer: "A",
    definitionId: "meiose",
  },
  {
    id: "aufbau-der-dna-1",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Wofür steht die Abkürzung DNA?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
    answers: [
      {
        id: "A",
        text: "Dihydronukleinsäure",
      },
      {
        id: "B",
        text: "Desoxynukleosäure",
      },
      {
        id: "C",
        text: "Desoxyribonukleinsäure",
      },
      {
        id: "D",
        text: "Dimethyl-N-acetat",
      },
    ],
    correctAnswer: "C",
  },
  {
    id: "aufbau-der-dna-2",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question:
      "Welche Forscher haben die Struktur der DNA erstmals beschrieben?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
    answers: [
      {
        id: "A",
        text: "Albert Einstein und Niels Bohr",
      },
      {
        id: "B",
        text: "Charles Darwin und Gregor Mendel",
      },
      {
        id: "C",
        text: "Marie Curie und Max Planck",
      },
      {
        id: "D",
        text: "James Watson und Francis Crick",
      },
    ],
    correctAnswer: "D",
  },
  {
    id: "aufbau-der-dna-3",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Welche Art von Bindung hält die beiden DNA-Stränge zusammen?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
    answers: [
      {
        id: "A",
        text: "Ionische Bindungen",
      },
      {
        id: "B",
        text: "Wasserstoffbrückenbindungen",
      },
      {
        id: "C",
        text: "Kovalente Bindungen",
      },
      {
        id: "D",
        text: "Peptidbindungen",
      },
    ],
    correctAnswer: "B",
  },
  {
    id: "aufbau-der-dna-4",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Wie ist die DNA im Zellkern organisiert?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
    answers: [
      {
        id: "A",
        text: "Als Einzelstrang",
      },
      {
        id: "B",
        text: "Als Chromosomenstruktur",
      },
      {
        id: "C",
        text: "Als zufällige Verwirrung",
      },
      {
        id: "D",
        text: "Als kompakte Kugeln",
      },
    ],
    correctAnswer: "B",
  },
  {
    id: "aufbau-der-dna-5",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Welche Moleküle liegen sich in der DNA immer gegenüber?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
    answers: [
      {
        id: "A",
        text: "Adenin - Guanin & Cytosin - Thymin",
      },
      {
        id: "B",
        text: "Adenin - Cytosin & Guanin - Thymin",
      },
      {
        id: "C",
        text: "Adrenalin - Cyan & Guacamole - Thymian",
      },
      {
        id: "D",
        text: "Adenin - Thymin & Guanin - Cytosin",
      },
    ],
    correctAnswer: "D",
  },
  {
    id: "aufbau-der-dna-6",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was sind Nukleotide?",
    answers: [
      {
        id: "A",
        text: "Enzyme, die den Zellstoffwechsel regulieren",
      },
      {
        id: "B",
        text: "Die Bausteine von Proteinen",
      },
      {
        id: "C",
        text: "Die Bausteine der DNA",
      },
      {
        id: "D",
        text: "Die Grundbausteine der Zellmembran",
      },
    ],
    correctAnswer: "C",
    definitionId: "nukleotide",
  },
  {
    id: "aufbau-der-dna-7",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Wie setzt sich ein Nukleotid zusammen?",
    answers: [
      {
        id: "A",
        text: "Base + Zucker + Phosphat",
      },
      {
        id: "B",
        text: "Aminosäure + Base + Phosphatgruppe",
      },
      {
        id: "C",
        text: "Wasserstoff + Zucker + Base",
      },
      {
        id: "D",
        text: "Base + Zucker",
      },
    ],
    correctAnswer: "A",
    definitionId: "nukleotide",
  },
  {
    id: "aufbau-der-dna-8",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was versteht man unter einem Karyogramm?",
    answers: [
      {
        id: "A",
        text: "Ein Diagramm, das den Verlauf des Zellzyklus zeigt",
      },
      {
        id: "B",
        text: "Darstellung aller Chromosomen einer Zelle",
      },
      {
        id: "C",
        text: "Eine Aufzählung der Proteine in einer Zelle",
      },
      {
        id: "D",
        text: "Eine Darstellung von Stoffwechselwegen in einer Zelle",
      },
    ],
    correctAnswer: "B",
    definitionId: "karyogramm",
  },
  {
    id: "aufbau-der-dna-9",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question:
      "Warum sind Keimzellen zur Gewinnung von Karyogrammen ungeeignet?",
    answers: [
      {
        id: "A",
        text: "Keimzellen enthalten zu viele Chromosomen",
      },
      {
        id: "B",
        text: "Keimzellen sind zu groß, um unter dem Mikroskop betrachtet zu werden",
      },
      {
        id: "C",
        text: "Keimzellen sind haploid und tragen somit nur den halben Chromosomensatz",
      },
      {
        id: "D",
        text: "Keimzellen haben keine definierten Chromosomenstrukturen",
      },
    ],
    correctAnswer: "C",
  },
  {
    id: "aufbau-der-dna-10",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Wie viele Chromosomenpaare hat ein menschliches Embryo?",
    image: { src: "/dna/chromosom.png", alt: "Chromosom" },
    answers: [
      {
        id: "A",
        text: "24 Chromosomenpaare",
      },
      {
        id: "B",
        text: "46 Chromosomenpaare",
      },
      {
        id: "C",
        text: "23 Chromosomenpaare",
      },
      {
        id: "D",
        text: "48 Chromosomenpaare",
      },
    ],
    correctAnswer: "C",
  },
  {
    id: "aufbau-der-dna-11",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Wie heißen die Einzelstränge, aus denen ein Chromosom besteht?",
    image: { src: "/dna/chromosom.png", alt: "Chromosom" },
    answers: [
      {
        id: "A",
        text: "Chromatidstränge",
      },
      {
        id: "B",
        text: "Proteinstränge",
      },
      {
        id: "C",
        text: "Nukleotidstränge",
      },
      {
        id: "D",
        text: "Genstränge",
      },
    ],
    correctAnswer: "A",
  },
  {
    id: "aufbau-der-dna-12",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was versteht man unter einem Phänotyp?",
    answers: [
      {
        id: "A",
        text: "Die genetische Zusammensetzung eines Organismus",
      },
      {
        id: "B",
        text: "Die Anzahl der Chromosomen in einer Zelle",
      },
      {
        id: "C",
        text: "Die Geschlechtsbestimmung bei Lebewesen",
      },
      {
        id: "D",
        text: "Die äußere Erscheinung und die beobachtbaren Merkmale eines Organismus",
      },
    ],
    correctAnswer: "D",
    definitionId: "phänotyp",
  },
  {
    id: "aufbau-der-dna-13",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was versteht man unter einem Genotyp?",
    answers: [
      {
        id: "A",
        text: "Die genetische Zusammensetzung eines Organismus",
      },
      {
        id: "B",
        text: "Die Anzahl der Chromosomen in einer Zelle",
      },
      {
        id: "C",
        text: "Die Geschlechtsbestimmung bei Lebewesen",
      },
      {
        id: "D",
        text: "Die äußere Erscheinung und die beobachtbaren Merkmale eines Organismus",
      },
    ],
    correctAnswer: "A",
    definitionId: "genotyp",
  },
  {
    id: "aufbau-der-dna-14",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Warum teilen sich Körperzellen?",
    answers: [
      {
        id: "A",
        text: "Erhöhung der Chromosomenanzahl für die genetische Vielfalt",
      },
      {
        id: "B",
        text: "Reparatur der geschädigten DNA-Moleküle",
      },
      {
        id: "C",
        text: "Reparatur und Erneuerung der Körperzellen und Wachstum und Entwicklung",
      },
      {
        id: "D",
        text: "Energieproduktion für die Zellteilung",
      },
    ],
    correctAnswer: "C",
  },
  {
    id: "aufbau-der-dna-15",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was sind Gameten?",
    answers: [
      {
        id: "A",
        text: "Ein spezieller Typ von Organen in Wirbeltieren",
      },
      {
        id: "B",
        text: "Die geschlechtlichen Fortpflanzungszellen bei Lebewesen",
      },
      {
        id: "C",
        text: "Ein Enzym, das an der DNA-Replikation beteiligt ist",
      },
      {
        id: "D",
        text: "Die Zellen, aus denen Gewebe aufgebaut ist",
      },
    ],
    correctAnswer: "B",
  },
  {
    id: "aufbau-der-dna-16",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question:
      "Warum ist beim Menschen die Bildung haploider Keimzellen notwendig?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
    answers: [
      {
        id: "A",
        text: "Um die Anzahl der Chromosomen zu verdoppeln",
      },
      {
        id: "B",
        text: "Um die Verdopplung der Chromosomenanzahl zu vermeiden",
      },
      {
        id: "C",
        text: "Um die Anzahl der Keimzellen zu erhöhen",
      },
      {
        id: "D",
        text: "Um die Versorgung der Zelle mit Energie sicherzustellen",
      },
    ],
    correctAnswer: "B",
  },
  {
    id: "aufbau-der-dna-17",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question:
      "Unsere DNA ist das Material im Zellkern. Welche Aufgaben hat sie?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
    answers: [
      {
        id: "A",
        text: "Energieproduktion in der Zelle",
      },
      {
        id: "B",
        text: "Steuerung des Zellstoffwechsels",
      },
      {
        id: "C",
        text: "Aufrechterhaltung der Zellform",
      },
      {
        id: "D",
        text: "Speicherung genetischer Informationen",
      },
    ],
    correctAnswer: "D",
  },
  {
    id: "aufbau-der-dna-18",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was ist ein Gen?",
    answers: [
      {
        id: "A",
        text: "Eine Einheit der genetischen Information",
      },
      {
        id: "B",
        text: "Ein Zellorganell",
      },
      {
        id: "C",
        text: "Eine Molekülkette in der Zelle",
      },
      {
        id: "D",
        text: "Ein spezielles Enzym in der Verdauung",
      },
    ],
    correctAnswer: "A",
    definitionId: "gen",
  },
  {
    id: "aufbau-der-dna-19",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was ist eine Zygote?",
    answers: [
      {
        id: "A",
        text: "Ein spezieller Typ von Zellmembran",
      },
      {
        id: "B",
        text: "Eine reife Eizelle",
      },
      {
        id: "C",
        text: "Eine befruchtete Eizelle, die aus der Fusion von männlicher und weiblicher Keimzelle entsteht",
      },
      {
        id: "D",
        text: "Eine Keimzelle",
      },
    ],
    correctAnswer: "C",
  },
  {
    id: "aufbau-der-dna-20",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was ist ein Crossing Over und wann findet es statt?",
    answers: [
      {
        id: "A",
        text: "Ein Begriff für die Teilung von Mitochondrien",
      },
      {
        id: "B",
        text: "Ein Austausch von genetischem Material zwischen homologen Chromosomen während der Meiose",
      },
      {
        id: "C",
        text: "Ein Prozess, bei dem sich Zellen teilen, um Energie zu produzieren",
      },
      {
        id: "D",
        text: "Ein Prozess, bei dem sich Zellen teilen, um Gewebe zu regenerieren",
      },
    ],
    correctAnswer: "B",
  },
  {
    id: "aufbau-der-dna-21",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Wozu dient ein Crossing Over?",
    answers: [
      {
        id: "A",
        text: "Zur Reparatur beschädigter DNA",
      },
      {
        id: "B",
        text: "Zur Erhöhung der genetischen Vielfalt",
      },
      {
        id: "C",
        text: "Zur Erzeugung von Mutationen",
      },
      {
        id: "D",
        text: "Zur Bildung von Chromosomenpaaren",
      },
    ],
    correctAnswer: "B",
  },
  {
    id: "aufbau-der-dna-22",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was ist ein Non-Disjunction?",
    answers: [
      {
        id: "A",
        text: "Ein Prozess, bei dem sich homologe Chromosomenpaare während der Meiose oder Mitose voneinander trennen, was zu einer ungleichen Verteilung von Chromosomen in den Tochterzellen führen kann",
      },
      {
        id: "B",
        text: "Ein Austausch von genetischem Material zwischen den homologen Chromosomen, der während der Meiose auftritt und genetische Variation erzeugt",
      },
      {
        id: "C",
        text: "Ein Prozess, bei dem die DNA in der Zelle durch den Einbau neuer Nukleotide dupliziert wird, um eine identische Kopie für die Tochterzellen zu schaffen",
      },
      {
        id: "D",
        text: "Ein Fehler in der Mitose oder Meiose, bei dem Chromosomen nicht korrekt getrennt werden und zu ungleichen Verteilungen von Chromosomen in den Tochterzellen führen",
      },
    ],
    correctAnswer: "D",
  },
  {
    id: "aufbau-der-dna-23",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was ist Monosomie?",
    answers: [
      {
        id: "A",
        text: "Der Verlust eines ganzen Chromosoms in einer Zelle",
      },
      {
        id: "B",
        text: "Der Austausch von genetischem Material zwischen homologen Chromosomen",
      },
      {
        id: "C",
        text: "Die Reduzierung der Chromosomenanzahl in einer Zelle",
      },
      {
        id: "D",
        text: "Ein Fehler in der Zellteilung, bei dem die Zellmembran nicht richtig geteilt wird",
      },
    ],
    correctAnswer: "A",
  },
  {
    id: "aufbau-der-dna-24",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Was ist heterozygot?",
    answers: [
      {
        id: "A",
        text: "Ein Organismus mit zwei unterschiedlichen Allelen für ein bestimmtes Gen",
      },
      {
        id: "B",
        text: "Ein Organismus mit zwei identischen Allelen für ein bestimmtes Gen",
      },
      {
        id: "C",
        text: "Ein Organismus mit einem einzigen Allel für ein bestimmtes Gen",
      },
      {
        id: "D",
        text: "Ein Organismus mit keinerlei Allelen für ein bestimmtes Gen",
      },
    ],
    correctAnswer: "A",
  },
  {
    id: "aufbau-der-dna-25",
    type: CBExerciseType.Quiz,
    topic: CBTopic.AufbauDNA,
    question: "Wie viele Chromosomen hat eine Keimzelle?",
    answers: [
      {
        id: "A",
        text: "Doppelt so viele wie eine Körperzelle",
      },
      {
        id: "B",
        text: "Genau so viele wie eine Körperzelle",
      },
      {
        id: "C",
        text: "Doppelt so viele wie eine Tochterzelle nach der Mitose",
      },
      {
        id: "D",
        text: "Halb so viele wie eine Körperzelle",
      },
    ],
    correctAnswer: "D",
  },
];
