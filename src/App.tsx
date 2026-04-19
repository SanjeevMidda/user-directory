import "./index.css";
import { useState, useMemo } from "react";
import { useUsers } from "./hooks/useUsers";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [userInput, setUserInput] = useState<string>("");
  const debouncedSearch = useDebounce(userInput, 500);
  const { userData, status } = useUsers(debouncedSearch);

  // function to save user input
  const saveUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // filter users
  const filteredUser = useMemo(() => {
    return userData.filter((user) =>
      (user?.name ?? "").toLowerCase().includes(userInput.toLowerCase())
    );
  }, [userData, debouncedSearch]);

  return (
    <div className="App">
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error loading data</p>}

      <div className="allUserContainer">
        <input
          type="text"
          id="search"
          value={userInput}
          onChange={saveUserInput}
          aria-label="search-input"
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
