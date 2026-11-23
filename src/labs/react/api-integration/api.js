// A tiny in-memory server standing in for a REST API. Every call waits, can
// fail on demand, and returns copies so callers cannot mutate the "database".
let tasks = [
  { id: 1, title: "Read the effects lesson", done: true },
  { id: 2, title: "Build the CRUD demo", done: false },
];
let nextId = 3;
let offline = false;

export function setOffline(value) {
  offline = value;
}

export function isOffline() {
  return offline;
}

async function request(produce) {
  await new Promise((resolve) => setTimeout(resolve, 450));
  if (offline) throw new Error("Network unavailable. Turn the simulation off.");
  return structuredClone(produce());
}

export function listTasks() {
  return request(() => tasks);
}

export function createTask(title) {
  return request(() => {
    const task = { id: nextId++, title, done: false };
    tasks = [...tasks, task];
    return task;
  });
}

export function updateTask(id, patch) {
  return request(() => {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, ...patch } : task,
    );
    return tasks.find((task) => task.id === id);
  });
}

export function deleteTask(id) {
  return request(() => {
    tasks = tasks.filter((task) => task.id !== id);
    return { id };
  });
}
