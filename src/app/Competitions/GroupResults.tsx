import { motion } from "framer-motion";
import CompetitionStyles from "./Competitions.module.css";
import Round from "./Round";
import { Result } from "../Types/solve";

type Props = {
  areGroupResultsShown: boolean;
  roundVisibilities: boolean[];
  toggleRoundVisibility: (index: number) => void;
  group: Result[][];
};
export default function GroupResults({
  areGroupResultsShown,
  roundVisibilities,
  toggleRoundVisibility,
  group,
}: Props) {
  return (
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
  );
}
