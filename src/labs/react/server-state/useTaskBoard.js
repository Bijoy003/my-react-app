import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  isOffline,
  listTasks,
  setOffline,
} from "./api";

// Query, mutations and the failure switch live here so the board component is
// mostly presentation.
export function useTaskBoard() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [offline, setOfflineState] = useState(isOffline);

  const tasks = useQuery({ queryKey: ["tasks"], queryFn: listTasks });
  const addTask = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
  const removeTask = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // The fake server's flag is module-level, so reset it when the lesson closes.
  useEffect(() => () => setOffline(false), []);

  function toggleOffline(next) {
    setOfflineState(next);
    setOffline(next);
  }

  function submit(event) {
    event.preventDefault();
    const text = title.trim();
    if (!text) return;
    addTask.mutate(text, { onSuccess: () => setTitle("") });
  }

  return {
    title,
    setTitle,
    offline,
    toggleOffline,
    tasks,
    addTask,
    removeTask,
    submit,
  };
}
