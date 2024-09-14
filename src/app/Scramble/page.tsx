"use client";
import { useState } from "react";
import ScrambleDisplayComponent from "./ScrambleDisplayComponent";
import getScramble from "./getScramble";
import scrambleStyles from "./Scramble.module.css";

function generateNewScramble(setScramble: (scramble: string) => void) {
  setScramble(getScramble());
}
export default function ScramblePage() {
  const [scramble, setScramble] = useState<string>(getScramble());

  return (
    <main
      style={{
        maxWidth: "792px",
        margin: "0 auto",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p className={scrambleStyles["scramble"]}>{scramble}</p>
      <ScrambleDisplayComponent
        scramble={scramble}
        event="333"
        visualization="2D"
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
