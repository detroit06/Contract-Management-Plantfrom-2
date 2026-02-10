import { createContext, useState, useEffect } from "react"; // ✅ React removed

import type { ReactNode } from "react"; // ✅ type-only import

import type { Blueprint } from "../types/Blueprint";


type BlueprintContextType = {
  blueprints: Blueprint[];
  addBlueprint: (bp: Blueprint | Blueprint[], replace?: boolean) => void;
  deleteBlueprint: (id: string) => void;
};

export const BlueprintContext = createContext<BlueprintContextType>({
  blueprints: [],
  addBlueprint: () => {},
  deleteBlueprint: () => {},
});

export const BlueprintProvider = ({ children }: { children: ReactNode }) => {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);

  // ✅ LOAD on app start
  useEffect(() => {
    const stored = localStorage.getItem("blueprints");
    if (stored) {
      setBlueprints(JSON.parse(stored));
    }
  }, []);

  // ✅ SAVE on every change
  useEffect(() => {
    localStorage.setItem("blueprints", JSON.stringify(blueprints));
  }, [blueprints]);

  const addBlueprint = (bp: Blueprint | Blueprint[], replace = false) => {
    if (replace && Array.isArray(bp)) {
      setBlueprints(bp);
    } else if (!Array.isArray(bp)) {
      setBlueprints((prev) => [...prev, bp]);
    }
  };

  const deleteBlueprint = (id: string) => {
    setBlueprints((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BlueprintContext.Provider
      value={{ blueprints, addBlueprint, deleteBlueprint }}
    >
      {children}
    </BlueprintContext.Provider>
  );
};
