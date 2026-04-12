import { useEffect, useState } from "react";
import "./index.css";
import type { User } from "./types/user";
function App() {
  // DONE - fetch data from API
  // DONE - store data from request in state
  // DONE - set up loading state
  // display key user information
  // set up searching/filtering
  // handle loading and error states

  // store user data
  const [userData, setUserData] = useState<User[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

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

  return (
    <div className="App">
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error loading data</p>}
    </div>
  );
}

export default App;
