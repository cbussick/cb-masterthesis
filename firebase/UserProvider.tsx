"use client";

import { NextOrObserver, User, onAuthStateChanged } from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MPMIUserCustomData } from "./UserCustomDataConverter";
import { auth } from "./firebase";
import { getUserCustomData } from "./getUserCustomData";
import { MPMIUserRole } from "./userRole";

interface UserProviderProps {
  children: ReactNode;
}

interface MPMIUserData {
  user: User | null;
  isUserLoaded: boolean;
  customData: MPMIUserCustomData;
  setCustomData: Dispatch<SetStateAction<MPMIUserCustomData>>;
}

const defaultUserData: MPMIUserData = {
  user: null,
  isUserLoaded: false,
  customData: {
    firstName: "",
    lastName: "",
    username: "",
    points: 0,
    solvedExercises: 0,
    completedExams: 0,
    role: MPMIUserRole.Student,
    unlockedGlossaryEntryIDs: [],
    profilePicture: "",
    mistakeExercises: [],
    trackedTime: [],
  },
  setCustomData: () => {},
};

export const UserContext = createContext<MPMIUserData | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(defaultUserData.user);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(
    defaultUserData.isUserLoaded,
  );
  const [customData, setCustomData] = useState<MPMIUserCustomData>(
    defaultUserData.customData,
  );

  const handleAuthStateChanged: NextOrObserver<User> = async (
    currentUser: User | null,
  ) => {
    if (currentUser) {
      setUser(currentUser);
      await getUserCustomData(currentUser.uid).then((customUserData) => {
        const data = customUserData.data();
        if (data !== undefined) {
          setCustomData(data);
        }
      });
    } else {
      // User is signed out
      setUser(null);
    }
    setIsUserLoaded(true);
  };

  useEffect(() => {
    // Necessary to trigger a rerender when the user logs in or out
    onAuthStateChanged(auth, handleAuthStateChanged);
  }, []);

  const value = useMemo(() => {
    return { user, isUserLoaded, customData, setCustomData };
  }, [customData, isUserLoaded, user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
