"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type EditModeContextType = {
  editMode: boolean;
  toggleEditMode: () => void;
};

const EditModeContext = createContext<EditModeContextType | undefined>(
  undefined
);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  return (
    <EditModeContext.Provider value={{ editMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) {
    throw new Error("useEditMode must be used inside EditModeProvider");
  }
  return ctx;
}
