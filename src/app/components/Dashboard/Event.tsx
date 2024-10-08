import dashboardStyles from "@/app/Dashboard/Dashboard.module.css";
import {
  formatInputToSeconds,
  formatTime,
  getAverage,
} from "@/app/utils/solveTime";
import Image from "next/image";
import trashIcon from "@/app/public/delete.svg";
import { useRef, useState } from "react";
import { addSolve, deleteSolve } from "@/app/utils/users";
import { useRouter } from "next/navigation";
import {
  AllowedEvents,
  EventDetail,
  UserComp,
  UserEvent,
} from "@/app/Types/solve";

function DeleteSolveButton({
  competitionId,
  event,
  roundNumber,
  solveNumber,
  userId,
}: {
  competitionId: string;
  event: AllowedEvents;
  roundNumber: number;
  solveNumber: number;
  userId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  async function deleteThisSolve() {
    setLoading(true);
    const solveDeletion = await deleteSolve(
      userId,
      competitionId,
      event,
      roundNumber - 1,
      solveNumber - 1,
    );

    setLoading(false);

    if (!solveDeletion.success) {
      return alert(
        solveDeletion.parsed.message || "Greška pri brisanju slaganja.",
      );
    }

    router.refresh();
  }
  return (
    <button
      onClick={deleteThisSolve}
      className={dashboardStyles["delete-solve"]}
      disabled={loading}
    >
      <Image src={trashIcon} width={24} height={24} alt="delete" />
    </button>
  );
}
function AddSolveInputAndButton({
  competitionId,
  roundNumber,
  eventName,
  userId,
}: {
  competitionId: string;
  roundNumber: number;
  eventName: string;
  userId: string;
}) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  async function addSolveToUser() {
    if (!inputValue.trim()) return;

    const solves = inputValue
      .split(" ")
      .map((solve) => formatInputToSeconds(solve))
      .filter(
        (solve): solve is number => solve !== null && solve !== undefined,
      );

    if (!solves || !solves.length) return;
    setLoading(true);
    const response = await addSolve(
      userId,
      competitionId,
      eventName,
      roundNumber - 1,
      solves,
    );

    if (!response.success) {
      setLoading(false);
      alert(response.parsed.message || "Greška prilikom dodavanja slaganja.");
      return;
    }

    // Reset the input value
    setInputValue("");
    router.refresh();
    setLoading(false);

    // Use a combination of setTimeout and requestAnimationFrame to ensure focus
    setTimeout(() => {
      requestAnimationFrame(() => inputRef.current?.focus());
    }, 0);
  }

  return (
    <>
      <input
        ref={inputRef} // Attach the ref to the input
        placeholder="Dodaj slaganje"
        className={dashboardStyles["solve-input"]}
        value={inputValue} // Add this line to bind the input value to the state
        onChange={handleChange}
        disabled={loading}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addSolveToUser();
          }
        }}
      />
      <button
        onClick={addSolveToUser}
        className={dashboardStyles["solve-add-btn"]}
        disabled={loading}
      >
        {loading ? "..." : "Dodaj"}
      </button>
    </>
  );
}

function Solve({
  solve,
  competitionId,
  eventName,
  roundNumber,
  userId,
  solveNumber,
}: {
  solve: number;
  competitionId: string;
  eventName: AllowedEvents;
  roundNumber: number;
  userId: string;
  solveNumber: number;
}) {
  return (
    <li className={dashboardStyles["solve"]}>
      {formatTime(solve)}{" "}
      <DeleteSolveButton
        solveNumber={solveNumber}
        competitionId={competitionId}
        event={eventName}
        roundNumber={roundNumber}
        userId={userId}
      />
    </li>
  );
}
function Round({
  roundNumber,
  round,
  competitionId,
  eventName,
  userId,
}: {
  roundNumber: number;
  round: number[] | undefined;
  competitionId: string;
  eventName: AllowedEvents;
  userId: string;
}) {
  return (
    <div className={dashboardStyles["round"]}>
      <h4>Runda {roundNumber}</h4>
      <p>Ao5: {getAverage(round)}</p>
      <ol className={dashboardStyles["solves-list"]}>
        {round?.map((solve, index) => (
          <Solve
            solveNumber={index + 1}
            solve={solve}
            competitionId={competitionId}
            eventName={eventName}
            key={index}
            roundNumber={roundNumber}
            userId={userId}
          />
        ))}
      </ol>
      {round?.length !== 5 && (
        <AddSolveInputAndButton
          competitionId={competitionId}
          roundNumber={roundNumber}
          eventName={eventName}
          userId={userId}
        />
      )}
    </div>
  );
}
function EventResults({
  event,
  userEvent,
  competitionId,
  userId,
}: {
  event: EventDetail;
  userEvent: UserEvent | undefined;
  competitionId: string;
  userId: string;
}) {
  return (
    <div className={dashboardStyles["event-results"]}>
      {[...Array(event.rounds)].map((_, index) => {
        const round = userEvent?.rounds[index];
        return (
          <Round
            competitionId={competitionId}
            key={index}
            roundNumber={index + 1}
            round={round}
            eventName={event.name}
            userId={userId}
          />
        );
      })}
    </div>
  );
}

export default function Event({
  event,
  userComp,
  userId,
  competitionId,
}: {
  event: EventDetail;
  userComp: UserComp | undefined;
  userId: string;
  competitionId: string;
}) {
  return (
    <div className={dashboardStyles["event"]}>
      <h3 className={dashboardStyles["event-name"]}>{event.name}</h3>
      <EventResults
        event={event}
        userEvent={
          userComp
            ? userComp.events.find((userComp) => {
                return userComp.event === event.name;
              })
            : undefined
        }
        competitionId={competitionId}
        userId={userId}
      />
    </div>
  );
}
