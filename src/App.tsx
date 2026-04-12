import { useEffect } from "react";
import "./index.css";
import { request } from "http";

function App() {
  // fetch data from API
  // display key user information
  // set up searching/filtering
  // handle loading and error states

  // fetch data from API

  let getUsers = async () => {
    try {
      let request = await fetch("https://jsonplaceholder.typicode.com/userss");

      if (!request.ok) {
        throw new Error(`Something went wrong! HTTP error: ${request.status}`);
      }

      let response = await request.json();
      console.log(response);
    } catch (error) {
      console.error(`${error}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return <div className="App"></div>;
}

export default App;
