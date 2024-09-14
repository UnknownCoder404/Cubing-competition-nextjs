"use client";
import { useState } from "react";
import ScrambleDisplay from "../components/Scramble/ScrambleDisplay";
import getScramble from "./getScramble";
import scrambleStyles from "./Scramble.module.css";
function handleScrambleShare(scramble: string) {
  const url = window.location.href;
  if (!navigator.share) {
    alert("Ovaj preglednik ne podržava dijeljenje. ");
    return;
  }
  navigator.share({
    title: "",
    text: `Složio sam Rubikovu kocku za scramble-om:
${scramble}.
Pokušaj i ti!
${url || ""}`,
  });
}
function generateNewScramble(setScramble: (scramble: string) => void) {
  setScramble(getScramble());
}
export default function ScramblePage() {
  const [scramble, setScramble] = useState<string>(getScramble());

  return (
    <main className={scrambleStyles["main"]}>
      <p className={scrambleStyles["scramble"]}>{scramble}</p>
      <div className={scrambleStyles["scramble-controls"]}>
        <ScrambleDisplay
          scramble={scramble}
          event="333"
          visualization="2D"
          containerClassName={scrambleStyles["scramble-display-container"]}
          onClick={() => handleScrambleShare(scramble)}
        />
        <div className={scrambleStyles["btn-rescramble-container"]}>
          <button
            className={scrambleStyles["btn-rescramble"]}
            onClick={() => {
              generateNewScramble(setScramble);
            }}
          >
            Promiješaj
          </button>
        </div>
      </div>
    </main>
  );
}
