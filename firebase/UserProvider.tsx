"use client";

import { getUserCustomDataDocumentReference } from "@/helpers/getUserDocumentReference";
import { NextOrObserver, User, onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { CBUserCustomData } from "./UserCustomDataConverter";
import { auth } from "./firebase";
import { CBUserRole } from "./userRole";

interface UserProviderProps {
  children: ReactNode;
}

interface CBUserData {
  user: User | null;
  isUserLoaded: boolean;
  customData: CBUserCustomData;
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
};

export const UserContext = createContext<CBUserData | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(defaultUserData.user);
  const [isUserLoaded, setUserLoaded] = useState<boolean>(
    defaultUserData.isUserLoaded,
  );
  const [customData, setCustomData] = useState<CBUserCustomData>(
    defaultUserData.customData,
  );

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
        if (data !== undefined) {
          setCustomData(data);
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
    return { user, isUserLoaded, customData };
  }, [customData, isUserLoaded, user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
