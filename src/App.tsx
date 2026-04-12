import { useEffect, useState } from "react";
import "./index.css";
import type { User } from "./types/user";
function App() {
  // DONE - fetch data from API
  // DONE - store data from request in state
  // DONE - set up loading state
  // DONE - display key user information
  // DONE - create TS interface for API data
  // state typed correctly
  // set up searching/filtering
  // handle loading and error states

  // store user data
  const [userData, setUserData] = useState<User[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [userInput, setUserInput] = useState("");

  // fetch data from API
  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      setStatus("loading");

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            `Something went wrong! HTTP error: ${response.status}`
          );
        }

        const data = await response.json();
        setUserData(data);
        setStatus("success");
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === "AbortError") return;
          console.error(error.message);
          setStatus("error");
        } else {
          console.error("Unknown error:", error);
        }
      }
    };

    getUsers();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  // function to save user input
  const saveUserInput = (e: any) => {
    setUserInput(e.target.value);
  };

  // filter users
  const filteredUser = userData.filter((user) =>
    user.name.toLowerCase().includes(userInput.toLowerCase())
  );

  console.log(filteredUser);

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
        {filteredUser.length > 0
          ? filteredUser.map((user: any) => {
              return (
                <div className="userContainer" key={user.id}>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.company.name}</p>
                </div>
              );
            })
          : "No users found"}

        <div className="emptyContainer"></div>
      </div>
    </div>
  );
}

export default App;
