import { User, Users } from "../Types/solve";
import Select from "react-select";

type UserSelectProps = {
  users: Users;
  setSelectedUser: (arg0: User) => void;
  disabled: boolean;
};
function UserSelect({ users, setSelectedUser, disabled }: UserSelectProps) {
  const usersAsOptions = users.map((user) => ({
    value: user._id,
    label: user.username,
  }));
  const firstUser = usersAsOptions[0];
  return (
    <Select
      instanceId={"prefix"} // Random string fixes error
      defaultValue={firstUser}
      options={usersAsOptions}
      isLoading={disabled}
      isDisabled={disabled}
      isSearchable={true}
      className="select-one"
      onChange={(e) =>
        setSelectedUser(users.find((user) => user._id === e!.value)!)
      }
    />
    // <select
    //   onChange={(e) =>
    //     setSelectedUser(users.find((u) => u._id === e.target.value)!)
    //   }
    //   disabled={disabled}
    // >
    //   {users.map((user) => {
    //     return (
    //       <option key={user._id} value={user._id}>
    //         {user.username}
    //       </option>
    //     );
    //   })}
    // </select>
  );
}

export default UserSelect;
