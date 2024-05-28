import { MPMIImgWithAlt } from "@/helpers/MPMIImgWithAlt";
import { MPMITopic } from "../topics";
import { MPMIAnswer } from "./MPMIAnswer";
import { MPMIExerciseType } from "./MPMIExerciseType";
import { MPMIExerciseWithTypeAndTopic } from "./MPMIExerciseWithType";

export interface MPMIQuizExercise extends MPMIExerciseWithTypeAndTopic {
  id: string;
  question: string;
  image?: MPMIImgWithAlt;
  answers: MPMIAnswer[];
  correctAnswer: string;
  hint: string;
}

export const quizExercises: MPMIQuizExercise[] = [
  {
    id: "zelle-grundlagen-2",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie ist das Endoplasmatische Retikulum (ER) aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Tipp: Das Endoplasmatische Retikulum (ER) besteht aus einem komplexen Netzwerk von Membranen.",
  },
  {
    id: "zelle-grundlagen-3",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
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
    hint: "Tipp: Das Endoplasmatische Retikulum (ER) spielt eine wichtige Rolle bei der Synthese, Modifikation und dem Transport von Proteinen und Lipiden.",
  },
  {
    id: "zelle-grundlagen-4",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie ist das Mitochondrium aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Tipp: Das Mitochondrium ist eine Organell mit einer doppelten Membranstruktur.",
  },
  {
    id: "zelle-grundlagen-5",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
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
    hint: "Tipp: Die Funktion des Mitochondriums ist eng mit der Energieproduktion in der Zelle verbunden. Betrachte den Prozess der Zellatmung, bei dem Mitochondrien eine zentrale Rolle spielen.",
  },
  {
    id: "zelle-grundlagen-6",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie sind Plasmodesmen aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Tipp: Plasmodesmen sind strukturelle Verbindungen zwischen pflanzlichen Zellen, die den Austausch von Molekülen ermöglichen",
  },
  {
    id: "zelle-grundlagen-7",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Was ist die Funktion von Plasmodesmen?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
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
    hint: "Tipp: Plasmodesmen sind strukturelle Verbindungen zwischen pflanzlichen Zellen, die den Austausch von Molekülen ermöglichen ",
  },
  {
    id: "zelle-grundlagen-8",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie ist die Zellmembran aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Tipp: Die Zellmembran ist eine dünne, flexible Hülle, die die Zelle umgibt und ihre Bestandteile einschließt.",
  },
  {
    id: "zelle-grundlagen-9",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
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
    hint: "Tipp: Die Zellmembran hat verschiedene lebenswichtige Funktionen für die Zelle. Denke daran, dass sie als semipermeable Barriere fungiert, die den Transport von Molekülen in und aus der Zelle reguliert. ",
  },
  {
    id: "zelle-grundlagen-10",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie ist das Zellplasma aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Tipp: Das Zellplasma, auch als Zytoplasma bezeichnet, ist eine gelartige Substanz, die den Zellraum zwischen der Zellmembran und dem Zellkern ausfüllt. ",
  },
  {
    id: "zelle-grundlagen-11",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Was ist die Funktion des Zellplasmas?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Tipp: Das Zellplasma (Zytoplasma) erfüllt mehrere wichtige Funktionen in der Zelle. Denke daran, dass es der Ort ist, an dem die meisten zellulären Aktivitäten stattfinden. ",
  },
  {
    id: "zelle-grundlagen-12",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie ist der Zellkern aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Der Zellkern hat eine komplexe Struktur, die verschiedene Komponenten umfasst. Überlege, welche Funktionen diese Komponenten erfüllen könnten und wie sie möglicherweise miteinander interagieren, um die Kernfunktionen zu unterstützen.",
  },
  {
    id: "zelle-grundlagen-13",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
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
    hint: "Der Zellkern spielt eine entscheidende Rolle bei der genetischen Steuerung und Informationsübertragung innerhalb der Zelle. Denk darüber nach, welche Aufgaben mit der genetischen Information und der Kontrolle von zellulären Prozessen verbunden sein könnten.",
  },

  {
    id: "zelle-grundlagen-14",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie ist das Ribosom aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Tipp: Ribosomen sind zelluläre Strukturen, die eine Schlüsselrolle bei der Proteinsynthese spielen.",
  },
  {
    id: "zelle-grundlagen-15",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Was ist die Funktion des Ribosoms?",
    image: { src: "/cell-organelles/ribosom.png", alt: "Ribosom" },
    answers: [
      { id: "A", text: "Ort der Proteinbiosynthese" },
      { id: "B", text: "Produktion von Lipiden in der Zelle" },
      { id: "C", text: "Regulation des Zellzyklus" },
      { id: "D", text: "Verdauung von Nährstoffen" },
    ],
    correctAnswer: "A",
    hint: "Die Funktion des Ribosoms ist eng mit der Synthese bestimmter Moleküle verbunden. Überlege, welche biologischen Prozesse und Moleküle in der Zelle benötigt werden und wie das Ribosom in diesen Prozessen eine Schlüsselrolle spielen könnte.",
  },
  {
    id: "zelle-grundlagen-16",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie ist der Golgi-Apparat aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Tipp: Überlege, dass der Golgi-Apparat aus flachen membranösen Säcken besteht, die als Cisternen bekannt sind. Diese Cisternen sind in Stapeln angeordnet. ",
  },
  {
    id: "zelle-grundlagen-17",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Was ist die Funktion des Golgi-Apparats?",
    image: { src: "/cell-organelles/golgi-apparat.png", alt: "Golgi-Apparat" },
    answers: [
      { id: "A", text: "Zellatmung" },
      { id: "B", text: "Stofftransport, Stoffaufnahme und Stoffabgabe" },
      { id: "C", text: "Schutz und Stabilität der Zelle" },
      { id: "D", text: "Proteinbiosynthese" },
    ],
    correctAnswer: "B",
    hint: "Der Golgi-Apparat spielt eine entscheidende Rolle im intrazellulären Transport und der Modifikation von Molekülen. Denke darüber nach, wie Zellen ihre Produkte vor der Freisetzung optimieren und organisieren könnten.",
  },
  {
    id: "zelle-grundlagen-18",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie ist ein Chloroplast aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Tipp: Der Chloroplast hat eine spezifische Doppelmembranstruktur, wobei die innere Membran in Form von Thylakoiden gestapelt ist, um Fotosynthese-Reaktionen zu ermöglichen.",
  },
  {
    id: "zelle-grundlagen-19",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Was ist die Funktion eines Chloroplasten?",
    image: { src: "/cell-organelles/chloroplast.png", alt: "Chloroplast" },
    answers: [
      { id: "A", text: "Fotosynthese und Zellatmung" },
      { id: "B", text: "Zellatmung und Stofftransport" },
      { id: "C", text: "Fotosynthese" },
      { id: "D", text: "Stofftransport" },
    ],
    correctAnswer: "C",
    hint: "Chloroplasten sind besonders wichtig für pflanzliche Zellen. Denk darüber nach, welche Prozesse in Pflanzenzellen mit Energieversorgung und Stoffwechsel in Verbindung stehen könnten. Betrachte auch die Rolle von Licht und chemischen Verbindungen in diesem Zusammenhang.",
  },
  {
    id: "zelle-grundlagen-20",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie ist die Zellwand aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
    answers: [
      { id: "A", text: "Aus einer einfachen Lipidschicht" },
      { id: "B", text: "Aus einer doppelten Membranschicht" },
      { id: "C", text: "Aus Phosphatresten" },
      { id: "D", text: "Aus Cellulose" },
    ],
    correctAnswer: "D",
    hint: "Tipp: Die Zellwand besteht aus spezifischen strukturellen Komponenten, die ihr Festigkeit verleihen. Denke darüber nach, wie diese Komponenten miteinander verbunden sind und welchen Zweck sie innerhalb der Zelle erfüllen.",
  },
  {
    id: "zelle-grundlagen-21",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Was ist die Funktion einer Zellwand?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
    answers: [
      { id: "A", text: "Schutz, Stabilität und Struktur" },
      { id: "B", text: "Stoffaufnahme und Stofftransport" },
      { id: "C", text: "Stoffwechselvorgänge und Entgiftung" },
      { id: "D", text: "Fotosynthese" },
    ],
    correctAnswer: "A",
    hint: "Die Zellwand ist eine strukturelle Komponente, die nicht nur Schutz, sondern auch Stabilität für die Zelle bietet. Überlege, welche Herausforderungen eine Zelle in Bezug auf äußere Einflüsse und ihre eigene Formstabilität bewältigen muss.",
  },
  {
    id: "zelle-grundlagen-22",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
    question: "Wie ist die Vakuole aufgebaut?",
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Pflanzliche Zelle",
    },
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
    hint: "Tipp: Die Vakuole ist eine zelluläre Struktur mit einer spezifischen Membran und einem flüssigen Inhalt. Überlege, welche Funktionen die Vakuole in der Zelle erfüllt und wie ihre Struktur dazu beiträgt. Denke auch an mögliche spezialisierte Regionen innerhalb der Vakuole.",
  },
  {
    id: "zelle-grundlagen-23",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.Zelle,
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
    hint: "Tipp: Die Funktion der Vakuole ist vielfältig und umfasst Aufgaben wie die Speicherung von Wasser, Nährstoffen und Abfallprodukten. Denke darüber nach, wie die Vakuole zur Aufrechterhaltung des Zellinnendrucks, zur Speicherung von chemischen Verbindungen und zur Entgiftung beiträgt. Betrachte auch die Rolle der Vakuole in der Zellstabilität und im Wachstumsprozess.",
  },
  {
    id: "mitose-meiose-1",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.MitoseMeiose,
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
    hint: "Die Mitose ist ein entscheidender Schritt im Zellzyklus, der die Zellteilung ermöglicht. Überlege, in welchem Organell dieser Prozess stattfinden könnte, indem du dir überlegst, welche Strukturen und Umgebungen für eine präzise Zellteilung notwendig sind.",
  },
  {
    id: "mitose-meiose-3",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.MitoseMeiose,
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
    hint: "Tipp: Die Mitose ist ein zellulärer Prozess, bei dem eine Mutterzelle in zwei identische Tochterzellen aufgeteilt wird. Denke darüber nach, welche Rolle die Mitose bei der Zellregeneration, Reparatur und dem Wachstum spielt.",
  },
  {
    id: "mitose-meiose-4",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.MitoseMeiose,
    question: "Was läuft in der Prophase ab?",
    image: {
      src: "/cell-division/mitosis/mitose.png",
      alt: "Mitosephasen: Interphase, Prophase, Metaphase, Anaphase, Telophase",
    },
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
    hint: "Tipp: In der Prophase der Zellteilung (Mitose oder Meiose) kondensieren die Chromosomen, der Kernkörper (Nukleolus) verschwindet, und die Kernhülle beginnt sich aufzulösen. Die Spindelfasern beginnen sich zu bilden, und die Zelle bereitet sich auf die nachfolgenden Schritte der Teilung vor.",
  },
  {
    id: "mitose-meiose-5",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.MitoseMeiose,
    question: "Was läuft in der Metaphase ab?",
    image: {
      src: "/cell-division/mitosis/mitose.png",
      alt: "Mitosephasen: Interphase, Prophase, Metaphase, Anaphase, Telophase",
    },
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
    hint: "Tipp: In der Metaphase der Zellteilung (Mitose oder Meiose) ordnen sich die kondensierten Chromosomen in der Mitte der Zelle an, auch als Äquator oder Metaphasenplatte bekannt. Die Spindelfasern befestigen sich an den Zentromeren der Chromosomen, wodurch eine symmetrische Anordnung entsteht.",
  },
  {
    id: "mitose-meiose-6",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.MitoseMeiose,
    question: "Was läuft in der Anaphase ab?",
    image: {
      src: "/cell-division/mitosis/mitose.png",
      alt: "Mitosephasen: Interphase, Prophase, Metaphase, Anaphase, Telophase",
    },
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
    hint: "Tipp: In der Anaphase der Zellteilung (Mitose oder Meiose) werden die Chromatiden der Chromosomen voneinander getrennt und zu den gegenüberliegenden Polen der Zelle gezogen. Dies geschieht durch die Kontraktion der Spindelfasern, was die Verteilung der genetischen Informationen auf die Tochterzellen ermöglicht.",
  },
  {
    id: "mitose-meiose-7",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.MitoseMeiose,
    question: "Was läuft in der Telophase ab?",
    image: {
      src: "/cell-division/mitosis/mitose.png",
      alt: "Mitosephasen: Interphase, Prophase, Metaphase, Anaphase, Telophase",
    },
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
    hint: "Tipp: In der Telophase der Zellteilung (Mitose oder Meiose) erfolgt die Entfaltung der Chromosomen zu ihrer ursprünglichen, entkondensierten Form. Die Kernhülle bildet sich wieder aus, und es entstehen zwei separate Zellkerne. Der Nukleolus erscheint erneut, und die Zelle bereitet sich darauf vor, sich physikalisch zu teilen.",
  },
  {
    id: "mitose-meiose-8",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.MitoseMeiose,
    question: "Was läuft in der Interphase ab?",
    image: {
      src: "/cell-division/mitosis/mitose.png",
      alt: "Mitosephasen: Interphase, Prophase, Metaphase, Anaphase, Telophase",
    },
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
    hint: "Tipp: Die Interphase ist keine Phase der Zellteilung selbst, sondern eine Phase zwischen den Teilungen. In dieser Phase wächst die Zelle, ihre Organellen vervielfachen sich, und die DNA repliziert sich. Es gibt drei Hauptstadien in der Interphase: G1-Phase (Wachstumsphase), S-Phase (Synthesephase, in der die DNA repliziert wird), und G2-Phase (Vorbereitung auf die Zellteilung).",
  },
  {
    id: "mitose-meiose-9",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.MitoseMeiose,
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
    hint: "Tipp: Die Meiose ist ein zellulärer Prozess, der zur Bildung von Geschlechtszellen führt (Spermien und Eizellen). Ihre Hauptaufgabe besteht darin, die Anzahl der Chromosomensätze zu halbieren, um genetische Vielfalt bei der sexuellen Fortpflanzung zu ermöglichen. Die Meiose besteht aus zwei aufeinanderfolgenden Teilungen (Meiose I und Meiose II).",
  },
  {
    id: "mitose-meiose-10",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.MitoseMeiose,
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
    hint: "Tipp: Das Ergebnis der Mitose ist die Bildung von zwei genetisch identischen Tochterzellen, die denselben Chromosomensatz wie die Mutterzelle haben. Dieser Prozess ist wichtig für das Wachstum, die Reparatur von Gewebe und die Aufrechterhaltung des Zellbestands.",
  },
  {
    id: "mitose-meiose-11",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.MitoseMeiose,
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
    hint: "Tipp: Sowohl bei Männern als auch bei Frauen führt die Meiose zur Bildung von Geschlechtszellen (Spermien bei Männern, Eizellen bei Frauen). Ein wichtiges Merkmal ist, dass die Meiose die Chromosomenzahl halbiert, was für die genetische Vielfalt bei der sexuellen Fortpflanzung entscheidend ist. Beachte jedoch, dass die Meiose bei Männern während der Spermatogenese kontinuierlich stattfindet, während bei Frauen die Meiose Teil der Eizellreifung ist und erst nach der Befruchtung abgeschlossen wird.",
  },
  {
    id: "aufbau-der-dna-1",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
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
    hint: "Tipp: Die DNA ist eine Molekülstruktur, die genetische Informationen in Zellen trägt und die Baupläne für die Entwicklung, Funktion und Reproduktion von Organismen enthält.",
  },
  {
    id: "aufbau-der-dna-2",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
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
    hint: "Tipp: Die Forscher, die die Struktur der DNA erstmals beschrieben, erhielten den Nobelpreis für Medizin im Jahr 1962. Ihr Beitrag revolutionierte das Verständnis der Genetik und der Vererbung von Merkmalen. Denke darüber nach, wer zu diesem Zeitpunkt anerkannt wurde.",
  },
  {
    id: "aufbau-der-dna-3",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
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
    hint: "Tipp: Diese Bindungen bilden sich zwischen den komplementären Basen Adenin (A) und Thymin (T), sowie zwischen Guanin (G) und Cytosin (C).",
  },
  {
    id: "aufbau-der-dna-4",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
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
    hint: "Tipp: Die DNA im Zellkern ist hochgradig organisiert und liegt in Form von Chromosomen vor. Diese Chromosomen bestehen aus langen DNA-Molekülen, die sich um Proteine wickeln. Denke darüber nach, wie diese Organisation die Speicherung und den Zugang zu genetischen Informationen erleichtert.",
  },
  {
    id: "aufbau-der-dna-5",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
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
    hint: "Tipp: Die Basen in der DNA bilden spezifische Paare, wobei Adenin (A) sich mit einer bestimmten Base paart und Guanin (G) sich mit einer anderen paart. Denke darüber nach, welche Basen sich in der DNA immer gegenüberliegen und wie diese Paarung die Struktur beeinflusst.",
  },
  {
    id: "aufbau-der-dna-6",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was sind Nukleotide?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Nukleotide sind Moleküle, die aus einem Phosphat, einem Zucker und einer Stickstoffbase bestehen. Denke darüber nach, wie diese Moleküle miteinander verknüpft sind und welche Funktion sie bei der Bildung der DNA haben.",
  },
  {
    id: "aufbau-der-dna-7",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Wie setzt sich ein Nukleotid zusammen?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Ein Nukleotid setzt sich aus drei Hauptkomponenten zusammen. Überlege, welche diese Komponenten sind und wie sie in der Struktur eines Nukleotids angeordnet sind.",
  },
  {
    id: "aufbau-der-dna-8",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was versteht man unter einem Karyogramm?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Ein Karyogramm bietet eine strukturierte Ansicht genetischer Information.",
  },
  {
    id: "aufbau-der-dna-9",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question:
      "Warum sind Keimzellen zur Gewinnung von Karyogrammen ungeeignet?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Bei der Gewinnung von Karyogrammen sind Keimzellen ungeeignet. Überlege, warum dies so ist, indem du dir die spezifischen Merkmale von Keimzellen anschaust und wie sich diese von somatischen Zellen unterscheiden.",
  },
  {
    id: "aufbau-der-dna-10",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Wie viele Chromosomenpaare hat ein menschliches Embryo?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Ein menschlicher Embryo hat eine bestimmte Anzahl von Chromosomenpaaren. Überlege, wie viele Chromosomen insgesamt vorhanden sind und wie sie paarweise angeordnet sind.",
  },
  {
    id: "aufbau-der-dna-11",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Wie heißen die Einzelstränge, aus denen ein Chromosom besteht?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Chromosomen bestehen aus Einzelsträngen, die spezielle Namen haben. Denke darüber nach, wie diese Einzelstränge genannt werden und wie sie zusammenwirken, um die charakteristische Struktur eines Chromosoms zu bilden.",
  },
  {
    id: "aufbau-der-dna-12",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was versteht man unter einem Phänotyp?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Der Phänotyp bezieht sich auf die sichtbaren Merkmale eines Organismus, die durch die Kombination von genetischer Information (Genotyp) und Umwelteinflüssen entstehen. Denke darüber nach, wie diese Faktoren miteinander interagieren.",
  },
  {
    id: "aufbau-der-dna-13",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was versteht man unter einem Genotyp?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Der Genotyp bezieht sich auf die genetische Information eines Organismus, die durch die Kombination seiner Allele für bestimmte Gene bestimmt wird. Überlege, wie der Genotyp die genetische Ausstattung und damit die möglichen Phänotypen beeinflusst.",
  },
  {
    id: "aufbau-der-dna-14",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Warum teilen sich Körperzellen?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Körperzellen teilen sich aus verschiedenen Gründen. Überlege, welche Funktionen die Zellteilung im Organismus erfüllt, wie etwa Wachstum, Reparatur von Gewebe und die Aufrechterhaltung des Zellbestands.",
  },
  {
    id: "aufbau-der-dna-15",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was sind Gameten?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Denke darüber nach, welche Rolle Gameten im Fortpflanzungsprozess spielen und wie sie sich von anderen Zellen unterscheiden.",
  },
  {
    id: "aufbau-der-dna-16",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
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
    hint: "Tipp: Die Bildung haploider Keimzellen ist entscheidend für die sexuelle Fortpflanzung beim Menschen. Überlege, warum die Reduktion der Chromosomenzahl in den Keimzellen wichtig ist und welche Rolle dies im Fortpflanzungsprozess spielt.",
  },
  {
    id: "aufbau-der-dna-17",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
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
    hint: "Tipp: Die DNA im Zellkern erfüllt verschiedene Aufgaben. Überlege, welche Funktionen die DNA hat, sowohl in Bezug auf die Speicherung von Informationen als auch auf ihre Rolle bei der Steuerung von Zellaktivitäten.",
  },
  {
    id: "aufbau-der-dna-18",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was ist ein Gen?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Ein Gen ist eine spezifische Abschnitt der DNA, der die Anleitung für die Produktion eines Proteins oder einer funktionellen RNA enthält.",
  },
  {
    id: "aufbau-der-dna-19",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was ist eine Zygote?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Eine Zygote ist eine Zelle, die durch die Verschmelzung von zwei Gameten entsteht. Überlege, welche Rolle die Zygote im Entwicklungsprozess eines Organismus spielt und wie sie zur Bildung eines neuen Individuums beiträgt.",
  },
  {
    id: "aufbau-der-dna-20",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was ist ein Crossing Over und wann findet es statt?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Denke darüber nach, warum dieser Vorgang während eines bestimmten Stadiums der Zellteilung stattfindet und welche Auswirkungen er auf die genetische Vielfalt hat.",
  },
  {
    id: "aufbau-der-dna-21",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Wozu dient ein Crossing Over?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Überlege, wie der Austausch von DNA-Abschnitten zwischen homologen Chromosomen während der Meiose zu neuen Kombinationen von Genen führt und warum dies für die Evolution und Anpassung von Organismen wichtig ist.",
  },
  {
    id: "aufbau-der-dna-22",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was ist ein Non-Disjunction?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Denke darüber nach, in welchem Stadium der Zellteilung Non-Disjunction auftreten kann und welche Auswirkungen dies auf die Chromosomenzahl in den Tochterzellen hat.",
  },
  {
    id: "aufbau-der-dna-23",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was ist Monosomie?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Monosomie ist ein genetischer Zustand, bei dem eine Zelle nur ein Exemplar eines bestimmten Chromosoms statt der üblichen zwei Exemplare hat. Überlege, wie Monosomie entsteht und welche Konsequenzen sie für die genetische Ausstattung des Organismus hat.",
  },
  {
    id: "aufbau-der-dna-24",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Was ist heterozygot?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Überlege, wie Heterozygotie in Bezug auf die genetische Vielfalt und Phänotypen wirkt.",
  },
  {
    id: "aufbau-der-dna-25",
    type: MPMIExerciseType.Quiz,
    topic: MPMITopic.AufbauDNA,
    question: "Wie viele Chromosomen hat eine Keimzelle?",
    image: { src: "/dna/doppelhelix.png", alt: "DNA Doppelhelix" },
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
    hint: "Tipp: Eine Keimzelle ist haploid, was bedeutet, dass sie die Hälfte der Chromosomenzahl einer somatischen Zelle hat. Überlege, warum die Reduktion der Chromosomenzahl in Keimzellen wichtig ist und wie dies zur genetischen Vielfalt beiträgt.",
  },
];
