"use client";
import CompetitionStyles from "./Competitions.module.css";
import { Result } from "../Types/solve";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "../utils/solveTime";

export default function RoundResults({
  round,
  show,
}: {
  round: Result[];
  show: boolean;
}) {
  const [height, setHeight] = useState<number | "auto">(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const roundResultsElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roundResultsElement.current) return;
    setIsTransitioning(true);
    const fullHeight = roundResultsElement.current.scrollHeight;

    if (show) {
      // Expand
      setHeight(fullHeight);
      handleTransitionEnd();
      return;
    }
    // Collapse
    setHeight(0);
    handleTransitionEnd();

    function handleTransitionEnd() {
      setTimeout(() => setIsTransitioning(false), 350);
    }
  }, [show]);

  return (
    <div
      className={`${CompetitionStyles["round-results"]} ${
        !isTransitioning && !show ? CompetitionStyles["hidden"] : ""
      }`}
      ref={roundResultsElement}
      style={{
        height: height === "auto" ? "auto" : `${height}px`,
      }}
      onTransitionEnd={() => console.log("transition ended")}
    >
      {round.length === 0 ? (
        <p>Nema rezultata za ovu rundu.</p>
      ) : (
        round.map((result, index) => {
          return (
            <div key={index} className={CompetitionStyles["solver"]}>
              <p className={CompetitionStyles["solve"]}>
                {index + 1}. {result.username}{" "}
                {result.solves.map((solve) => formatTime(solve)).join(" ")} (Ao5{" "}
                {formatTime(+result.average)})
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
