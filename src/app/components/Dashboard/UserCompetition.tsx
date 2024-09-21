"use client";

import { CompetitionType } from "@/app/Competitions/page";
import { User } from "@/app/Dashboard/page";
import { url } from "@/globals";
import { useEffect, useState } from "react";

type Props = {
  user: User;
  show: boolean;
};
let competitionsCache: CompetitionType[] = [];
async function fetchCompetitions() {
  if (competitionsCache.length) {
    return competitionsCache;
  }
  const response = await fetch(`${url}competitions`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const parsed = await response.json();
  competitionsCache = parsed;
  return parsed;
}

function CompetitionSelect({
  setSelectedCompetition,
}: {
  setSelectedCompetition: (arg0: CompetitionType) => void;
}) {
  const [competitions, setCompetitions] = useState<
    CompetitionType[] | undefined
  >(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCompetitions();
      setCompetitions(data);
      setSelectedCompetition(data[0]);
    };
    fetchData();
  }, [setSelectedCompetition]);

  if (!competitions) {
    return <p>Učitavanje...</p>;
  }
  return (
    <select
      onChange={async (e) => {
        setSelectedCompetition(
          (await fetchCompetitions()).find((c: CompetitionType) => {
            return c._id === e.target.value;
          }),
        );
      }}
    >
      {competitions.map((competition: CompetitionType) => (
        <option key={competition._id} value={competition._id}>
          {competition.name}
        </option>
      ))}
    </select>
  );
}

function CompResults({
  user,
  selectedCompetition,
}: {
  user: User;
  selectedCompetition: CompetitionType | undefined;
}) {
  if (!selectedCompetition) {
    return <></>;
  }
  return <div>{JSON.stringify(selectedCompetition)}</div>;
}

function CompetitionWindow({ user }: { user: User }) {
  const [selectedCompetition, setSelectedCompetition] = useState<
    CompetitionType | undefined
  >(undefined);

  return (
    <>
      <CompetitionSelect setSelectedCompetition={setSelectedCompetition} />
      <CompResults user={user} selectedCompetition={selectedCompetition} />
    </>
  );
}

export default function UserCompetition({ user, show }: Props) {
  if (!show) return <></>;
  return <CompetitionWindow user={user} />;
}
