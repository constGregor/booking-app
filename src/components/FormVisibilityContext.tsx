"use client";

import { createContext } from "react";
import { FC, ReactNode, useState } from "react";

interface FormVisibilityContextType {
  formVisibility: boolean;
  toggleForm: () => void;
}

export const FormVisibilityContext = createContext<FormVisibilityContextType>(
  {} as FormVisibilityContextType
);

interface FormVisibilityProviderProps {
  children: ReactNode;
}

export const FormVisibilityProvider: FC<FormVisibilityProviderProps> = ({
  children,
}) => {
  const [formVisibility, setFormVisibility] = useState(false);

  const toggleForm = () => {
    setFormVisibility((prevState) => !prevState);
  };

  return (
    <FormVisibilityContext.Provider value={{ formVisibility, toggleForm }}>
      {children}
    </FormVisibilityContext.Provider>
  );
};
