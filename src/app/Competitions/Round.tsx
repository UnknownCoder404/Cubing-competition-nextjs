"use client";
import RoundResults from "./RoundResults";

import CompetitionStyles from "./Competitions.module.css";
import ShowAndHide from "../components/Competitions/showAndHide";

export default function Round({
  round,
  show,
  toggleRoundVisibility,
  roundIndex,
}: {
  round: any[];
  show: boolean;
  toggleRoundVisibility: () => void;
  roundIndex: number;
}) {
  return (
    <>
      <div className={CompetitionStyles["round-title-container"]}>
        <h4 className={CompetitionStyles["round-title"]}>
          Runda {roundIndex + 1}
        </h4>
        <ShowAndHide toggleVisibility={toggleRoundVisibility} show={show} />
      </div>
      <RoundResults show={show} round={round} />
    </>
  );
}
