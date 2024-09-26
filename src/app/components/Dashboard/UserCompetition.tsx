"use client";

import { useState } from "react";
import dashboardStyles from "@/app/Dashboard/Dashboard.module.css";
import Event from "./Event";
import { CompetitionType, User } from "@/app/Types/solve";

function CompetitionSelect({
  setSelectedCompetition,
  competitions,
}: {
  setSelectedCompetition: (arg0: CompetitionType) => void;
  competitions: CompetitionType[];
}) {
  if (!competitions) {
    return <p>Učitavanje...</p>;
  }
  return (
    <select
      className={dashboardStyles["select-comp"]}
      onChange={(e) => {
        setSelectedCompetition(
          competitions.find((c) => {
            return c._id === e.target.value;
          })!,
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

  const compDate = new Date(selectedCompetition.date);
  const dateString = compDate.toLocaleString();

  return (
    <div className={dashboardStyles["comp-results"]}>
      <div className={dashboardStyles["comp-results-info"]}>
        <h2 className={dashboardStyles["comp-name"]}>
          {selectedCompetition.name}
        </h2>
        <p className={dashboardStyles["comp-date"]}>{dateString}</p>
      </div>
      {selectedCompetition.events.map((event) => (
        <Event
          competitionId={selectedCompetition._id}
          userId={user._id}
          event={event}
          key={event.name}
          userComp={user.competitions.find(
            (c) => c.competitionId === selectedCompetition._id,
          )}
        />
      ))}
    </div>
  );
}

function CompetitionWindow({
  user,
  competitions,
}: {
  user: User;
  competitions: CompetitionType[];
}) {
  const [selectedCompetition, setSelectedCompetition] = useState<
    CompetitionType | undefined
  >(competitions[0]);

  return (
    <div className={dashboardStyles["comp"]}>
      <CompetitionSelect
        setSelectedCompetition={setSelectedCompetition}
        competitions={competitions}
      />
      <CompResults user={user} selectedCompetition={selectedCompetition} />
    </div>
  );
}

type Props = {
  user: User;
  show: boolean;
  competitions: CompetitionType[];
};

export default function UserCompetition({ user, show, competitions }: Props) {
  if (!show) return <></>;
  return <CompetitionWindow user={user} competitions={competitions} />;
}
