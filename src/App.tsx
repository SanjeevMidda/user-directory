import { useEffect, useState } from "react";
import "./index.css";
import { request } from "http";

function App() {
  // fetch data from API
  // store data from request in state
  // display key user information
  // set up searching/filtering
  // handle loading and error states

  // store user data
  const [userData, setUserData] = useState([]);

  // fetch data from API
  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === "AbortError") return;
          console.error(error.message);
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
  return <div className="App"></div>;
}

export default App;
