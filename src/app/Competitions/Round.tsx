"use client";
import Image from "next/image";
import hideImg from "../public/hide.svg";
import showImg from "../public/show.svg";
import RoundResults from "./RoundResults";

import CompetitionStyles from "./Competitions.module.css";

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
        <button
          className={CompetitionStyles["show-hide"]}
          onClick={toggleRoundVisibility}
        >
          <Image
            src={show ? showImg : hideImg}
            width={undefined}
            height={24}
            alt={show ? "Hide" : "Show"}
          />
        </button>
      </div>
      <RoundResults show={show} round={round} />
    </>
  );
}
