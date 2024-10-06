"use client";
import CompetitionStyles from "./Competitions.module.css";
import { Result } from "../Types/solve";
import { formatTime } from "../utils/solveTime";
import { motion } from "framer-motion";

export default function RoundResults({
  round,
  show,
}: {
  round: Result[];
  show: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: show ? 1 : 0,
        height: show ? "auto" : 0,
        transition: { duration: 0.3, ease: "easeIn" },
      }}
      className={`${CompetitionStyles["round-results"]} ${
        show ? "" : CompetitionStyles["hidden"]
      }`}
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
    </motion.div>
  );
}
