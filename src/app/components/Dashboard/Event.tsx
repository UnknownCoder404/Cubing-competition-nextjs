import dashboardStyles from "@/app/Dashboard/Dashboard.module.css";
import { UserComp, UserEvent } from "@/app/Dashboard/page";
import { formatTime, getAverage } from "@/app/utils/solveTime";
import Image from "next/image";
import trashIcon from "@/app/public/delete.svg";

function DeleteSolveButton({
  competitionId,
  event,
  round,
  solve,
}: {
  competitionId: string;
  event: string;
  round: number;
  solve: number;
}) {
  return (
    <button className={dashboardStyles["delete-solve"]}>
      <Image src={trashIcon} width={24} height={24} alt="delete" />
    </button>
  );
}

function Solve({ solve }: { solve: number }) {
  return (
    <li className={dashboardStyles["solve"]}>
      {formatTime(solve)} <DeleteSolveButton solve={solve} />
    </li>
  );
}
function Round({
  roundNumber,
  round,
}: {
  roundNumber: number;
  round: number[] | undefined;
}) {
  return (
    <div className={dashboardStyles["round"]}>
      <h4>Runda {roundNumber}</h4>
      <p>Ao5: {getAverage(round)}</p>
      <ol className={dashboardStyles["solves-list"]}>
        {round?.map((solve, index) => <Solve solve={solve} key={index} />)}
      </ol>
    </div>
  );
}
function EventResults({
  event,
  userEvent,
}: {
  event: any;
  userEvent: UserEvent | undefined;
}) {
  return (
    <div className={dashboardStyles["event-results"]}>
      {[...Array(event.rounds)].map((_, index) => {
        const round = userEvent?.rounds[index];
        return <Round key={index} roundNumber={index + 1} round={round} />;
      })}
    </div>
  );
}

export default function Event({
  event,
  userComp,
}: {
  event: any;
  userComp: UserComp | undefined;
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
      />
    </div>
  );
}
