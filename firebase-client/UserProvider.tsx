"use client";

import { getIncorrectExerciseCollectionReference } from "@/helpers/getIncorrectExerciseCollectionReference";
import { getTopicWorldProgressDocumentReference } from "@/helpers/getTopicWorldProgressDocumentReference";
import { getUserCustomDataDocumentReference } from "@/helpers/getUserCustomDataDocumentReference";
import { NextOrObserver, User, onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { auth } from "./firebase";
import { CBIncorrectExercise } from "./incorrectExercisesConverter";
import { CBTopicWorldProgress } from "./topicWorldProgressConverter";
import { CBUserCustomData } from "./userCustomDataConverter";
import { CBUserRole } from "./userRole";

interface UserProviderProps {
  children: ReactNode;
}

export interface CBUser {
  user: User;
  customData: CBUserCustomData;
  topicWorldProgress: CBTopicWorldProgress;
  incorrectExercises: CBIncorrectExercise[];
}

export interface CBUserData {
  user: User | null;
  isUserLoaded: boolean;
  customData: CBUserCustomData;
  topicWorldProgress: CBTopicWorldProgress;
  incorrectExercises: CBIncorrectExercise[];
}

const defaultUserData: CBUserData = {
  user: null,
  isUserLoaded: false,
  customData: {
    firstName: "",
    lastName: "",
    username: "",
    points: 0,
    solvedExercises: 0,
    completedExams: 0,
    role: CBUserRole.Student,
    unlockedGlossaryEntryIDs: [],
    profilePicture: "",
    trackedTime: [],
  },
  topicWorldProgress: {
    topics: {},
  },
  incorrectExercises: [],
};

export const UserContext = createContext<CBUserData>(defaultUserData);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(defaultUserData.user);
  const [isUserLoaded, setUserLoaded] = useState<boolean>(
    defaultUserData.isUserLoaded,
  );
  const [customData, setCustomData] = useState<CBUserCustomData>(
    defaultUserData.customData,
  );

  const [topicWorldProgress, setTopicWorldProgress] =
    useState<CBTopicWorldProgress>(defaultUserData.topicWorldProgress);

  const [incorrectExercises, setIncorrectExercises] = useState<
    CBIncorrectExercise[]
  >(defaultUserData.incorrectExercises);

  const handleAuthStateChanged: NextOrObserver<User> = async (
    currentUser: User | null,
  ) => {
    if (currentUser) {
      setUser(currentUser);

      const userCustomDataReference = getUserCustomDataDocumentReference(
        currentUser.uid,
      );

      onSnapshot(userCustomDataReference, (snapshot) => {
        const data = snapshot.data();
        if (data) {
          setCustomData(data);
        }
      });

      const topicWorldProgressReference =
        getTopicWorldProgressDocumentReference(currentUser.uid);

      onSnapshot(topicWorldProgressReference, (snapshot) => {
        const data = snapshot.data();
        if (data) {
          setTopicWorldProgress(data);
        }
      });

      const incorrectExercisesReference =
        getIncorrectExerciseCollectionReference(currentUser.uid);

      onSnapshot(incorrectExercisesReference, (snapshot) => {
        const documents = snapshot.docs;
        if (documents) {
          const incorrectExerciseData = documents.map((d) => d.data());
          setIncorrectExercises(incorrectExerciseData);
        }
      });
    } else {
      // User is signed out
      setUser(null);
    }
    setUserLoaded(true);
  };

  useEffect(() => {
    // Necessary to trigger a rerender when the user logs in or out
    onAuthStateChanged(auth, handleAuthStateChanged);
  }, []);

  const value = useMemo(() => {
    return {
      user,
      isUserLoaded,
      customData,
      topicWorldProgress,
      incorrectExercises,
    };
  }, [customData, incorrectExercises, isUserLoaded, topicWorldProgress, user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
