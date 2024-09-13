"use client";
import { useState } from "react";
import { Result } from "./EventResults";

import CompetitionStyles from "./Competitions.module.css";

import Round from "./Round";

export default function Group({
  group,
  groupNumber,
}: {
  group: Result[][];
  groupNumber: number;
}) {
  const [isGroupShown, setGroupVisibility] = useState(true);
  const groupIndex = groupNumber - 1;
  return (
    <div
      style={{ display: isGroupShown ? "auto" : "none" }}
      className={CompetitionStyles["group"]}
      id={`group-${groupIndex}`}
    >
      <div className={CompetitionStyles["group-title-container"]}>
        <h4 className={CompetitionStyles["group-title"]}>
          Grupa {groupNumber}
        </h4>
      </div>
      {group.map((round, index) => {
        const [isRoundShown, setRoundVisibility] = useState(false);
        function toggleRoundVisibility() {
          setRoundVisibility(!isRoundShown);
        }
        return (
          <Round
            round={round}
            show={isRoundShown}
            toggleRoundVisibility={toggleRoundVisibility}
            key={index}
            roundIndex={index}
          />
        );
      })}
    </div>
  );
}
