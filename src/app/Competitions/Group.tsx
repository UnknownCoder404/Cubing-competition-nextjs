"use client";
import { useState } from "react";
import { Result } from "./EventResults";

import CompetitionStyles from "./Competitions.module.css";

import Round from "./Round";
import ShowAndHide from "../components/Competitions/showAndHide";

export default function Group({
  group,
  groupNumber,
}: {
  group: Result[][];
  groupNumber: number;
}) {
  const [areGroupResultsShown, setGroupResultsVisibility] = useState(true);
  function toggleGroupResultsVisibility() {
    setGroupResultsVisibility(!areGroupResultsShown);
  }
  const groupIndex = groupNumber - 1;

  return (
    <div className={CompetitionStyles["group"]} id={`group-${groupIndex}`}>
      <div className={CompetitionStyles["group-title-container"]}>
        <h4 className={CompetitionStyles["group-title"]}>
          Grupa {groupNumber}
        </h4>
        <ShowAndHide
          show={areGroupResultsShown}
          toggleVisibility={toggleGroupResultsVisibility}
        />
      </div>
      <div
        className={`${CompetitionStyles["group-results"]} ${
          areGroupResultsShown ? "" : CompetitionStyles["hidden"]
        }`}
      >
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
    </div>
  );
}
