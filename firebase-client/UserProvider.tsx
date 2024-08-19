"use client";

import { getTopicWorldDocumentReference } from "@/helpers/getTopicWorldDocumentReference";
import { getUserCustomDataDocumentReference } from "@/helpers/getUserCustomDataDocumentReference";
import { NextOrObserver, User, onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { CBTopicWorldProgress } from "./TopicWorldProgressConverter";
import { CBUserCustomData } from "./UserCustomDataConverter";
import { auth } from "./firebase";
import { CBUserRole } from "./userRole";

interface UserProviderProps {
  children: ReactNode;
}

export interface CBUser {
  user: User;
  customData: CBUserCustomData;
  topicWorldProgress: CBTopicWorldProgress;
}

export interface CBUserData {
  user: User | null;
  isUserLoaded: boolean;
  customData: CBUserCustomData;
  topicWorldProgress: CBTopicWorldProgress;
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
    mistakeExercises: [],
    trackedTime: [],
  },
  topicWorldProgress: {
    topics: {},
  },
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

      const topicWorldProgressReference = getTopicWorldDocumentReference(
        currentUser.uid,
      );

      onSnapshot(topicWorldProgressReference, (snapshot) => {
        const data = snapshot.data();
        if (data) {
          setTopicWorldProgress(data);
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
    return { user, isUserLoaded, customData, topicWorldProgress };
  }, [customData, isUserLoaded, topicWorldProgress, user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
