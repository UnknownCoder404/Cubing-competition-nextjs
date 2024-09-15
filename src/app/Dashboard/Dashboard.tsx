type UserCompetition = {
  competitionId: string;
  _id: string;
  events: {
    event: "3x3" | "2x2" | "3x3oh" | "4x4";
    rounds: number[][];
  }[];
};
type User = {
  _id: string;
  username: string;
  role: "user" | "admin";
  group: number;
  competitions: UserCompetition[];
};
export default function Dashboard({ users }: { users: User[] }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p></p>
    </div>
  );
}
