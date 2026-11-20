import Demo from "./Demo";
import Notes from "./Notes";

export default {
  id: "protected-routes",
  track: "react",
  order: 15,
  level: "routing",
  title: "Protected routes",
  summary:
    "A guard component redirects signed-out visitors to sign-in, remembers where they were heading, and sends them back after sign-in.",
  Demo,
  Notes,
};
