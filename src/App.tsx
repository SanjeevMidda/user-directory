import "./index.css";
import { useState } from "react";
import { useUsers } from "./hooks/useUsers";

function App() {
  const [userInput, setUserInput] = useState("");
  const { userData, status } = useUsers();

  // function to save user input
  const saveUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // filter users
  const filteredUser = userData.filter((user) =>
    (user?.name ?? "").toLowerCase().includes(userInput.toLowerCase())
  );

  return (
    <div className="App">
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error loading data</p>}

      <div className="allUserContainer">
        <input
          type="text"
          value={userInput}
          onChange={(e) => saveUserInput(e)}
        />

        {status === "success" &&
          filteredUser.map((user) => (
            <div className="userContainer" key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.company?.name}</p>
            </div>
          ))}

        {userInput && filteredUser.length === 0 && <p>No users found</p>}

        <div className="emptyContainer"></div>
      </div>
    </div>
  );
}

export default App;
