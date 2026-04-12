import { useEffect } from "react";
import "./index.css";
import { request } from "http";

function App() {
  // fetch data from API
  // display key user information
  // set up searching/filtering
  // handle loading and error states

  // fetch data from API

  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            `Something went wrong! HTTP error: ${response.status}`
          );
        }

        let data = await response.json();
        console.log(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === "Abort Error") return;
          console.error(error.message);
        } else {
          console.error(`Unknown error: ${error}`);
        }
      }
    };

    getUsers();

    return () => {
      controller.abort();
    };
  }, []);

  return <div className="App"></div>;
}

export default App;
