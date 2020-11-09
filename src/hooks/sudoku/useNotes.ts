import { useEffect, useState } from "react";

export const useNotes = () => {
  const [notesOn, setNotesOn] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setNotesOn((prev) => !prev);
      }
    };
    document.addEventListener("keydown", (e) => handleGlobalKeyDown(e));
    return () =>
      document.removeEventListener("keydown", (e) => handleGlobalKeyDown(e));
  }, []);

  return { notesOn, setNotesOn };
};
