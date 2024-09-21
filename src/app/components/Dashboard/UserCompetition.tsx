import { User } from "@/app/Dashboard/page";

type Props = {
  user: User;
  show: boolean;
};

export default function UserCompetition({ user, show }: Props) {
  if (!show) return <></>;
  return <div>{user.username}</div>;
}
