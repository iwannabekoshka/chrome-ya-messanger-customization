import styles from "./User.module.css";

interface IProps {
  user: IUser;
  changeUser: (name: string, field: keyof IUser, value: string) => void;
  removeUser: (name: string) => void;
}

export interface IUser {
  name: string;
  color: string;
  after: string;
}

function User({ user, removeUser, changeUser }: IProps) {
  return (
    <li className={styles.listItem} style={{ color: user.color }}>
      <input
        className={styles.input}
        style={{ "--color": user.color } as React.CSSProperties}
        name="name"
        type="text"
        value={user.name}
        placeholder="Name"
        onChange={e => changeUser(user.name, "name", e.target.value)}
      />
      <input
        className={styles.input}
        name="color"
        type="text"
        value={user.color}
        placeholder="Color"
        onChange={e => changeUser(user.name, "color", e.target.value)}
      />
      <input
        className={styles.input}
        name="after"
        type="text"
        value={user.after}
        placeholder="After"
        title="CSS emoji or text"
        onChange={e => changeUser(user.name, "after", e.target.value)}
      />
      <button className={styles.btnRemove} onClick={() => removeUser(user.name)}>
        x
      </button>
    </li>
  );
}

export default User;
