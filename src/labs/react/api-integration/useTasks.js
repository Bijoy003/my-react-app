import { useEffect, useState } from "react";
import { createTask, deleteTask, listTasks, updateTask } from "./api";

// Server state plus the four REST calls live here so the component only has to
// decide what to render for each state.
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // StrictMode runs this effect twice; the flag keeps the first request from
    // writing state after its cleanup has already run.
    let active = true;
    listTasks()
      .then((data) => {
        if (!active) return;
        setTasks(data);
        setStatus("ready");
      })
      .catch((reason) => {
        if (!active) return;
        setError(reason.message);
        setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [attempt]);

  function retry() {
    setError(null);
    setStatus("loading");
    setAttempt((value) => value + 1);
  }

  async function add(title) {
    setError(null);
    try {
      const task = await createTask(title);
      setTasks((current) => [...current, task]);
    } catch (reason) {
      setError(reason.message);
    }
  }

  // Toggle and delete share the same per-row busy handling.
  async function run(task, work) {
    setBusyId(task.id);
    setError(null);
    try {
      await work();
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusyId(null);
    }
  }

  function toggle(task) {
    return run(task, async () => {
      const updated = await updateTask(task.id, { done: !task.done });
      setTasks((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
    });
  }

  function remove(task) {
    return run(task, async () => {
      await deleteTask(task.id);
      setTasks((current) => current.filter((item) => item.id !== task.id));
    });
  }

  return { tasks, status, error, busyId, retry, add, toggle, remove };
}
