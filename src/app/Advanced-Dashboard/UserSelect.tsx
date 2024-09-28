import { User, Users } from "../Types/solve";

type UserSelectProps = {
  users: Users;
  setSelectedUser: (arg0: User) => void;
  disabled: boolean;
};
function UserSelect({ users, setSelectedUser, disabled }: UserSelectProps) {
  return (
    <select
      onChange={(e) =>
        setSelectedUser(users.find((u) => u._id === e.target.value)!)
      }
      disabled={disabled}
    >
      {users.map((user) => {
        return (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        );
      })}
    </select>
  );
}

export default UserSelect;
