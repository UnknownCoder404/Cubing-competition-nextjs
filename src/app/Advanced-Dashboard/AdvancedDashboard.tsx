"use client";

import { useEffect, useState } from "react";
import { CompetitionType, Users } from "../Types/solve";
import styles from "./AdvancedDashboard.module.css";
import { addToken } from "../utils/credentials";
import { url } from "@/globals";

function ResultsBtn({ competition }: { competition: CompetitionType }) {
  const [results, setResults] = useState<Blob | undefined>(undefined);

  useEffect(() => {
    setResults(undefined);
    const getResults = async () => {
      const results = await getResultsForCompById(
        competition._id,
        competition.name,
      );
      setResults(results);
    };
    getResults();
  }, [competition]);
  if (!results) return <button>Učitavanje...</button>;
  return (
    <button
      onClick={() => {
        const url = window.URL.createObjectURL(results);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${competition.name} - Rezultati.xlsx`;

        document.body.appendChild(a);
        a.click();
      }}
    >
      Rezultati
    </button>
  );
}

async function getFile(url: string): Promise<Blob> {
  if (!url) throw new Error("URL or fileName is not defined");
  const anchor = document.createElement("a");
  const data = await fetch(url, {
    headers: addToken({}) || {},
  });
  const blob = await data.blob();
  return blob;
}

const resultsCache: Record<string, Blob> = {}; // Cache object

async function getResultsForCompById(id: string, compName: string) {
  // Check if the results are already cached
  if (resultsCache[id]) {
    return resultsCache[id];
  }

  // If not cached, fetch the results
  const resultsUrl = new URL(url);
  resultsUrl.pathname = "results";
  resultsUrl.searchParams.set("competitionId", id);

  const file = await getFile(resultsUrl.toString());

  // Store the fetched results in the cache
  resultsCache[id] = file;

  return file;
}

function CompSelect({
  competitions,
  setSelectedCompetition,
}: {
  competitions: CompetitionType[];
  setSelectedCompetition: (arg0: CompetitionType) => void;
}) {
  return (
    <select
      onChange={(e) =>
        setSelectedCompetition(
          competitions.find((c) => c._id === e.target.value)!,
        )
      }
    >
      {competitions.map((comp) => {
        return (
          <option value={comp._id} key={comp._id}>
            {comp.name}
          </option>
        );
      })}
    </select>
  );
}

export default function AdvancedDashboard({
  users,
  competitions,
}: {
  users: Users;
  competitions: CompetitionType[];
}) {
  const [selectedCompetition, setSelectedCompetition] =
    useState<CompetitionType>(competitions[0]);

  return (
    <div className={styles["options"]}>
      <div className="excel-options-container">
        <h2>Excel</h2>
        <CompSelect
          competitions={competitions}
          setSelectedCompetition={setSelectedCompetition}
        />
        <ResultsBtn competition={selectedCompetition} />
      </div>
    </div>
  );
}
