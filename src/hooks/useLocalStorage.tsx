import { useEffect, useState } from "react";
import { TodoState } from "../model";

export const useLocalStorage = (key: string, defaultValue: TodoState[]) => {
  const [todos, setTodos] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todos));
  }, [key, todos]);

  return [todos, setTodos];
};
