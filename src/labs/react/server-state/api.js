// Same kind of fake server as the API integration lesson: latency, a failure
// switch, and copies so React Query never sees a mutated object.
let tasks = [
  { id: 1, title: "Read the API integration lesson", done: true },
  { id: 2, title: "Try a mutation and watch the cache", done: false },
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

export function deleteTask(id) {
  return request(() => {
    tasks = tasks.filter((task) => task.id !== id);
    return { id };
  });
}
