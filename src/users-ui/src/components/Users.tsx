import User, { IUser } from "./User";
import styles from "./Users.module.css";

interface IProps {
  users: IUser[];
  changeUser: (name: string, field: keyof IUser, value: string) => void;
  removeUser: (name: string) => void;
}

function Users({ users, changeUser, removeUser }: IProps) {
  return (
    <div>
      <ul className={styles.list}>
        {users.length > 0 &&
          users.map(user => (
            <User key={user.name} user={user} changeUser={changeUser} removeUser={removeUser} />
          ))}
        {users.length === 0 && <p>No users</p>}
      </ul>
    </div>
  );
}

export default Users;
