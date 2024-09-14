"use client";
import { useState } from "react";
import ScrambleDisplayComponent from "../components/Scramble/ScrambleDisplay";
import getScramble from "./getScramble";
import scrambleStyles from "./Scramble.module.css";

function generateNewScramble(setScramble: (scramble: string) => void) {
  setScramble(getScramble());
}
export default function ScramblePage() {
  const [scramble, setScramble] = useState<string>(getScramble());

  return (
    <main className={scrambleStyles["main"]}>
      <p className={scrambleStyles["scramble"]}>{scramble}</p>
      <ScrambleDisplayComponent
        scramble={scramble}
        event="333"
        visualization="2D"
        containerClassName={scrambleStyles["scramble-display-container"]}
      />
      <button
        className={scrambleStyles["btn-rescramble"]}
        onClick={() => {
          generateNewScramble(setScramble);
        }}
      >
        Promiješaj
      </button>
    </main>
  );
}
