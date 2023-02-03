import { SyntheticEvent, useState } from "react";
import { IUser } from "./User";

interface IProps {
  users: IUser[];
  addUser: (name: string) => void;
}

function AddUser({ users, addUser }: IProps) {
  const [name, setName] = useState("");

  function submitHandler(e: SyntheticEvent) {
    e.preventDefault();

    if (!users.findIndex(user => user.name === name)) {
      return;
    }

    setName("");
    addUser(name);
  }

  return (
    <form action="#" onSubmit={submitHandler}>
      <input
        value={name}
        type="text"
        placeholder="New user"
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Add user</button>
    </form>
  );
}

export default AddUser;
