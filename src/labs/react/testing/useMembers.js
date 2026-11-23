import { useEffect, useState } from "react";
import { fetchMembers } from "./api";

// The same status machine as the API lesson, kept small on purpose: the tests
// need a component that is genuinely loading, ready or failed.
export function useMembers() {
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // The flag ignores a response that arrives after unmount.
    let active = true;
    fetchMembers()
      .then((data) => {
        if (!active) return;
        setMembers(data);
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

  return { members, status, error, retry };
}
