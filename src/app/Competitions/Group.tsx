"use client";
import { useState } from "react";
import { Result } from "../Types/solve";
import { motion } from "framer-motion";

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

  // Initialize an array of visibility states, one for each round
  const [roundVisibilities, setRoundVisibilities] = useState<boolean[]>(
    group.map(() => false), // Default to false (hidden) for each round
  );

  function toggleGroupResultsVisibility() {
    setGroupResultsVisibility(!areGroupResultsShown);
  }

  function toggleRoundVisibility(index: number) {
    setRoundVisibilities((prevVisibilities) => {
      const newVisibilities = [...prevVisibilities];
      newVisibilities[index] = !newVisibilities[index];
      return newVisibilities;
    });
  }

  const groupIndex = groupNumber - 1;

  return (
    <div
      className={`${CompetitionStyles["group"]} ${
        areGroupResultsShown ? "" : CompetitionStyles["no-gap"]
      }`} // Apply the no-gap class when group results are hidden
      id={`group-${groupIndex}`}
    >
      <div className={CompetitionStyles["group-title-container"]}>
        <h4 className={CompetitionStyles["group-title"]}>
          Grupa {groupNumber}
        </h4>
        <ShowAndHide
          show={areGroupResultsShown}
          toggleVisibility={toggleGroupResultsVisibility}
        />
      </div>

      {/* Animate height and add padding/margin collapse */}
      <motion.div
        className={`${CompetitionStyles["group-results"]}`}
        initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
        animate={{
          height: areGroupResultsShown ? "auto" : 0,
          opacity: areGroupResultsShown ? 1 : 0,
          paddingTop: areGroupResultsShown ? "1rem" : 0, // Adjust based on your styles
          paddingBottom: areGroupResultsShown ? "1rem" : 0, // Adjust based on your styles
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }} // Ensure the content doesn't overflow when hidden
      >
        {group.map((round, index) => {
          return (
            <Round
              round={round}
              show={roundVisibilities[index]}
              toggleRoundVisibility={() => toggleRoundVisibility(index)}
              key={index}
              roundIndex={index}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
