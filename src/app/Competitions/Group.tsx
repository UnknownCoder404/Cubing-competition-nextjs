"use server";
import { Result } from "./EventResults";

export default async function Group({
  group,
  groupNumber,
}: {
  group: Result[][];
  groupNumber: number;
}) {
  return (
    <>
      <h1>Grupa {groupNumber}</h1>
      {group.map((round, index) => {
        return (
          <>
            <h2>Runda {index + 1}</h2>
          </>
        );
      })}
    </>
  );
}
