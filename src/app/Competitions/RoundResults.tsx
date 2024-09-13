"use client";

import { Result } from "./EventResults";

export default function RoundResults({
  round,
  show,
}: {
  round: Result[];
  show: boolean;
}) {
  return (
    <div style={{ display: show ? "block" : "none" }} className="round-results">
      {JSON.stringify(round)}
    </div>
  );
}
