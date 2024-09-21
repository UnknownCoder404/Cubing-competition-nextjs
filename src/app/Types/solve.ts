export type AllowedEvents = "3x3" | "4x4" | "3x3oh" | "2x2";

export type UserEvent = {
  event: AllowedEvents;
  rounds: number[][];
};

export type UserComp = {
  competitionId: string;
  events: UserEvent[];
};

export type Role = "admin" | "user";

export type User = {
  _id: string;
  username: string;
  password: string;
  role: Role;
  competitions: UserComp[];
  group: 1 | 2;
};

export type Users = User[];

interface EventDetails {
  [key: string]: Result[][];
}
export type CompetitionType = {
  _id: string;
  name: string;
  date: string; // ISO date string
  isLocked: boolean;
  events: EventDetails;
};
export type CompetitionsType = {
  [key: string]: CompetitionType;
};
export type Result = {
  userId: "string";
  group: number;
  average: string;
  username: string;
  solves: number[];
};
