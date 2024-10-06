"use client";
import { useEffect, useRef, useState } from "react";
import { Result } from "../Types/solve";
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
  const [groupResultsHeight, setGroupResultsHeight] = useState<number | "auto">(
    0,
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const resultsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resultsContainer = resultsContainerRef.current;

    if (!resultsContainer) return;

    const fullHeight = resultsContainer.scrollHeight;

    if (areGroupResultsShown) {
      setGroupResultsHeight(fullHeight);
      const timer = setTimeout(() => {
        setGroupResultsHeight("auto");
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsTransitioning(true);
      setGroupResultsHeight(fullHeight);
      setTimeout(() => setGroupResultsHeight(0), 10);
    }
  }, [areGroupResultsShown]);

  const [roundVisibilities, setRoundVisibilities] = useState<boolean[]>(
    group.map(() => false),
  );

  const toggleGroupResultsVisibility = () =>
    setGroupResultsVisibility((prev) => !prev);

  const toggleRoundVisibility = (index: number) =>
    setRoundVisibilities((prev) =>
      prev.map((visible, i) => (i === index ? !visible : visible)),
    );

  return (
    <div className={CompetitionStyles.group} id={`group-${groupNumber - 1}`}>
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
          !areGroupResultsShown && !isTransitioning
            ? CompetitionStyles.hidden
            : ""
        }`}
        style={{
          height:
            typeof groupResultsHeight === "number"
              ? `${groupResultsHeight}px`
              : "auto",
          padding: areGroupResultsShown ? "1rem" : "0",
          transition: "height 0.3s ease-in, padding 0.3s ease-in",
          overflow: "hidden",
        }}
        ref={resultsContainerRef}
      >
        {group.map((round, index) => (
          <Round
            round={round}
            show={roundVisibilities[index]}
            toggleRoundVisibility={() => toggleRoundVisibility(index)}
            key={index}
            roundIndex={index}
          />
        ))}
      </div>
    </div>
  );
}
