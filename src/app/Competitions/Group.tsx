"use client";
import { Result } from "./EventResults";

export default async function Group({
  group,
  groupNumber,
}: {
  group: Result[][];
  groupNumber: number;
}) {
  const groupIndex = groupNumber - 1;
  return (
    <div className="group" id={`group-${groupIndex}`}>
      <h1>Grupa {groupNumber}</h1>
      {group.map((round, index) => {
        return (
          <>
            <h2>Runda {index + 1}</h2>
          </>
        );
      })}
    </div>
  );
}
