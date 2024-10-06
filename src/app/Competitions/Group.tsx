"use client";
import { useEffect, useRef, useState } from "react";
import { Result } from "../Types/solve";
import CompetitionStyles from "./Competitions.module.css";
import Round from "./Round";
import ShowAndHide from "../components/Competitions/showAndHide";

// Helper to manage transition state and height
const calculateHeight = (
  container: HTMLDivElement | null,
  setHeight: React.Dispatch<React.SetStateAction<number | "auto">>,
  setTransitioning: React.Dispatch<React.SetStateAction<boolean>>,
  isVisible: boolean,
) => {
  if (!container) return;
  const fullHeight = container.scrollHeight;
  setTransitioning(true);
  if (isVisible) {
    // Expand
    setHeight(fullHeight);
    setTimeout(() => {
      setHeight("auto");
      setTransitioning(false);
    }, 350);
  } else {
    // Collapse
    setHeight(fullHeight);
    setTimeout(() => {
      setHeight(0);
      handleTransitionEnd();
    }, 10);
  }
  function handleTransitionEnd() {
    setTimeout(() => setTransitioning(false), 350);
  }
};

// Group Header Component
const GroupHeader = ({
  groupNumber,
  areGroupResultsShown,
  toggleGroupResultsVisibility,
  isTransitioning,
}: {
  groupNumber: number;
  areGroupResultsShown: boolean;
  toggleGroupResultsVisibility: () => void;
  isTransitioning: boolean;
}) => (
  <div className={CompetitionStyles["group-title-container"]}>
    <h4 className={CompetitionStyles["group-title"]}>Grupa {groupNumber}</h4>
    <ShowAndHide
      disabled={isTransitioning}
      show={areGroupResultsShown}
      toggleVisibility={toggleGroupResultsVisibility}
    />
  </div>
);

// Group Results Component
const GroupResults = ({
  group,
  areGroupResultsShown,
  groupResultsHeight,
  isTransitioning,
  resultsContainerRef,
  roundVisibilities,
  toggleRoundVisibility,
}: {
  group: Result[][];
  areGroupResultsShown: boolean;
  groupResultsHeight: number | "auto";
  isTransitioning: boolean;
  resultsContainerRef: React.RefObject<HTMLDivElement>;
  roundVisibilities: boolean[];
  toggleRoundVisibility: (index: number) => void;
}) => (
  <div
    className={`${CompetitionStyles["group-results"]} ${
      !areGroupResultsShown && !isTransitioning ? CompetitionStyles.hidden : ""
    }`}
    style={{
      height:
        typeof groupResultsHeight === "number"
          ? `${groupResultsHeight}px`
          : "auto",
      padding: areGroupResultsShown ? "1rem" : "0",
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
);

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

  const [roundVisibilities, setRoundVisibilities] = useState<boolean[]>(
    group.map(() => false),
  );

  // Handle toggling group results visibility
  const toggleGroupResultsVisibility = () =>
    setGroupResultsVisibility((prev) => !prev);

  // Handle toggling individual round visibility
  const toggleRoundVisibility = (index: number) =>
    setRoundVisibilities((prev) =>
      prev.map((visible, i) => (i === index ? !visible : visible)),
    );

  useEffect(() => {
    calculateHeight(
      resultsContainerRef.current,
      setGroupResultsHeight,
      setIsTransitioning,
      areGroupResultsShown,
    );
  }, [areGroupResultsShown]);

  return (
    <div className={CompetitionStyles.group} id={`group-${groupNumber - 1}`}>
      <GroupHeader
        groupNumber={groupNumber}
        areGroupResultsShown={areGroupResultsShown}
        toggleGroupResultsVisibility={toggleGroupResultsVisibility}
        isTransitioning={isTransitioning}
      />
      <GroupResults
        group={group}
        areGroupResultsShown={areGroupResultsShown}
        groupResultsHeight={groupResultsHeight}
        isTransitioning={isTransitioning}
        resultsContainerRef={resultsContainerRef}
        roundVisibilities={roundVisibilities}
        toggleRoundVisibility={toggleRoundVisibility}
      />
    </div>
  );
}
