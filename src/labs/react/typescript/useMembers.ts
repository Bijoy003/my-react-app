import { useEffect, useState } from "react";
import { fetchMembers } from "./api";
import type { Member } from "./types";

type Status = "loading" | "ready" | "error";

interface MembersState {
  members: Member[];
  status: Status;
  error: string | null;
}

// The return type makes the hook's contract explicit: consumers get typed
// members and a status, never an accidental `any`.
export function useMembers(): MembersState {
  const [members, setMembers] = useState<Member[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchMembers()
      .then((data) => {
        if (!active) return;
        setMembers(data);
        setStatus("ready");
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setError(reason instanceof Error ? reason.message : "Unknown error");
        setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  return { members, status, error };
}
