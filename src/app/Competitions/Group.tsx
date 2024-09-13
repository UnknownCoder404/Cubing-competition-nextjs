"use client";
import { useState } from "react";
import { Result } from "./EventResults";
import RoundResults from "./RoundResults";

export default function Group({
  group,
  groupNumber,
}: {
  group: Result[][];
  groupNumber: number;
}) {
  const groupIndex = groupNumber - 1;
  return (
    <div className="group" id={`group-${groupIndex}`}>
      <h1>Grupa {groupNumber}</h1>
      {group.map((round, index) => {
        const [isShown, setVisibility] = useState(false);
        return (
          <>
            <h4 className="round-title">Runda {index + 1}</h4>
            <button onClick={() => setVisibility(!isShown)}>Show</button>
            <RoundResults show={isShown} round={round} />
          </>
        );
      })}
    </div>
  );
}
