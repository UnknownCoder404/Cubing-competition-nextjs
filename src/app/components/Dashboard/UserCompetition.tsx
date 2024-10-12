"use client";

import { useEffect, useState } from "react";
import dashboardStyles from "@/app/Dashboard/Dashboard.module.css";
import Event from "./Event";
import { CompetitionType, User } from "@/app/Types/solve";
import { motion } from "framer-motion";

function saveSelectedCompetition(selectedCompetition: CompetitionType) {
  sessionStorage.setItem(
    "selectedCompetitionId",
    JSON.stringify(selectedCompetition._id),
  );
}
function CompetitionSelect({
  setSelectedCompetition,
  competitions,
  selectedCompetition,
}: {
  setSelectedCompetition: (arg0: CompetitionType) => void;
  competitions: CompetitionType[];
  selectedCompetition: CompetitionType | undefined;
}) {
  if (!competitions) {
    return <p>Učitavanje...</p>;
  }
  return (
    <select
      className={dashboardStyles["select-comp"]}
      value={selectedCompetition?._id || ""}
      onChange={(e) => {
        const selectedComp = competitions.find(
          (c) => c._id === e.target.value,
        )!;
        setSelectedCompetition(selectedComp);
        saveSelectedCompetition(selectedComp);
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
  show,
}: {
  user: User;
  competitions: CompetitionType[];
  show: boolean;
}) {
  const [selectedCompetition, setSelectedCompetition] = useState<
    CompetitionType | undefined
  >(undefined);

  useEffect(() => {
    const rememberedCompetitionId = sessionStorage.getItem(
      "selectedCompetitionId",
    );

    if (rememberedCompetitionId) {
      setSelectedCompetition(
        competitions.find(
          (c) => c._id === JSON.parse(rememberedCompetitionId),
        ) || competitions[0],
      );
      return;
    }
    setSelectedCompetition(competitions[0]);
  }, [competitions]);

  if (!selectedCompetition) return <></>;

  return (
    <motion.div
      className={dashboardStyles["comp"]}
      initial={{ height: 0 }}
      animate={{
        height: show ? "auto" : "0",
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
      }}
    >
      <CompetitionSelect
        setSelectedCompetition={setSelectedCompetition}
        competitions={competitions}
        selectedCompetition={selectedCompetition}
      />
      <CompResults user={user} selectedCompetition={selectedCompetition} />
    </motion.div>
  );
}

type Props = {
  user: User;
  show: boolean;
  competitions: CompetitionType[];
};

export default function UserCompetition({ user, show, competitions }: Props) {
  return (
    <CompetitionWindow user={user} competitions={competitions} show={show} />
  );
}
