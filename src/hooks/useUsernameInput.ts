import { useEffect, useState } from "react";
import { keysNotAllowed } from "../constants/global";

export const useUsernameInput = () => {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState({ bool: false, text: "" });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    const validateUsername = (
      value: string,
      setValid: React.Dispatch<
        React.SetStateAction<{
          bool: boolean;
          text: string;
        }>
      >
    ) => {
      if (value === "") {
        setValid({ bool: false, text: "" });
      } else if (value.length < 2) {
        setValid({ bool: false, text: "username is too short" });
      } else if (20 < value.length) {
        setValid({ bool: false, text: "username is too long" });
      } else if (keysNotAllowed.some((char) => value.includes(char))) {
        setValid({ bool: false, text: "not allowed keys" });
      } else if (value[0] === " ") {
        setValid({
          bool: false,
          text: "username has to begin with a character",
        });
      } else {
        setValid({ bool: true, text: "" });
      }
    };
    // Validation
    validateUsername(value, setValid);
  }, [value]);

  return { value, handleOnChange, valid };
};
