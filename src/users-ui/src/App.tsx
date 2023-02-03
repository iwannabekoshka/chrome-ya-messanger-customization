import { useEffect, useState } from "react";
import "./App.css";
import AddUser from "./components/AddUser";
import { IUser } from "./components/User";
import Users from "./components/Users";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id || 0, { type: "getLocalStorage" }, function (response) {
        setUsers(JSON.parse(response.data["users-customization"]));
      });
    });
  }, []);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(
        activeTab.id || 0,
        { type: "setLocalStorage", users: users },
        function (response) {}
      );
    });
  }, [users]);

  function addUser(name: string) {
    const newUser: IUser = {
      name: name,
      color: "white",
      after: "",
    };

    setUsers(prev => [newUser, ...prev]);
  }

  function removeUser(name: string) {
    setUsers(prev => [...prev].filter(user => user.name !== name));
  }

  function changeUser(name: string, field: keyof IUser, value: string) {
    const changedUserIndex = users.findIndex(user => user.name === name);
    const newUsers = [...users];
    const changedUser = newUsers[changedUserIndex];
    changedUser[field] = value;

    setUsers(newUsers);
  }

  return (
    <div className="App">
      <AddUser users={users} addUser={addUser} />
      <Users users={users} changeUser={changeUser} removeUser={removeUser} />
    </div>
  );
}

export default App;
