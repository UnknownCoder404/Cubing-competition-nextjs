import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CompetitionType } from "../Types/solve";
import styles from "./AdvancedDashboard.module.css";
import { addToken } from "../utils/credentials";
import { url } from "@/globals";
import Select from "react-select";

type ResultsBtnProps = {
  competition: CompetitionType | undefined;
  setLoading: (arg0: boolean) => void;
};

type CompSelectProps = {
  competitions: CompetitionType[];
  setSelectedCompetition: (arg0: CompetitionType) => void;
  disabled: boolean;
};

const getResultsForCompById = async (id: string): Promise<Blob> => {
  const resultsUrl = new URL(url);
  resultsUrl.pathname = "results";
  resultsUrl.searchParams.set("competitionId", id);

  const data = await fetch(resultsUrl.toString(), {
    headers: addToken({}) || {},
  });
  return data.blob();
};

function ResultsBtn({ competition, setLoading }: ResultsBtnProps) {
  const competitionId = competition?._id || "";

  const resultsQuery = useQuery(
    ["results", competitionId],
    () => getResultsForCompById(competitionId),
    {
      enabled: !!competitionId,
    },
  );

  const { data: results, isLoading, error } = resultsQuery;
  const resultsStyles = styles["results"];

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (!competition) return null;
  if (isLoading)
    return <button className={resultsStyles}>Učitavanje...</button>;
  if (error)
    return <button className={resultsStyles}>Greška pri učitavanju</button>;

  return (
    <button
      className={resultsStyles}
      onClick={() => {
        if (!results) return;
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

function CompSelect({
  competitions,
  setSelectedCompetition,
  disabled,
}: CompSelectProps) {
  const competitionsAsOptions = competitions.map((competition) => ({
    value: competition._id,
    label: competition.name,
  }));
  return (
    <Select
      isDisabled={disabled}
      isLoading={disabled}
      className="select-one"
      options={competitionsAsOptions}
      defaultValue={competitionsAsOptions[0]}
      instanceId="prefix"
      onChange={(e) => {
        setSelectedCompetition(competitions.find((c) => c._id === e!.value)!);
      }}
    />
  );
}

export default function Excel({
  competitions,
}: {
  competitions: CompetitionType[];
}) {
  const [selectedCompetition, setSelectedCompetition] = useState<
    CompetitionType | undefined
  >(competitions[0]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className={styles["excel-options-container"]}>
      <h2>Excel</h2>
      <CompSelect
        competitions={competitions}
        setSelectedCompetition={setSelectedCompetition}
        disabled={loading}
      />
      <ResultsBtn setLoading={setLoading} competition={selectedCompetition} />
    </div>
  );
}
