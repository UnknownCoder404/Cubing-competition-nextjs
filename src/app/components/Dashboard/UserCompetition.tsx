"use client";

import { User } from "@/app/Dashboard/page";
import { url } from "@/globals";
import { useEffect, useState } from "react";

type Props = {
  user: User;
  show: boolean;
};
let competitionsCache: any[] = [];
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
  setSelectedCompetition: (arg0: any) => void;
}) {
  const [competitions, setCompetitions] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCompetitions();
      setCompetitions(data);
      setSelectedCompetition(data[0]);
    };
    fetchData();
  }, []);

  if (!competitions.length) {
    return <p>Učitavanje...</p>;
  }

  return (
    <select
      onChange={async (e) => {
        setSelectedCompetition(
          (await fetchCompetitions()).find((c: any) => {
            return c._id === e.target.value;
          }),
        );
      }}
    >
      {competitions.map((competition) => (
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
  selectedCompetition: any;
}) {
  console.log("selectedCompetition", selectedCompetition);
  return <div>{JSON.stringify(selectedCompetition)}</div>;
}

function CompetitionWindow({ user }: { user: User }) {
  const [selectedCompetition, setSelectedCompetition] = useState<
    string | undefined
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
