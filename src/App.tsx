import { useEffect } from "react";
import "./index.css";

function App() {
  // fetch data from API
  // display key user information
  // set up searching/filtering
  // handle loading and error states

  // fetch data from API

  let getUsers = async () => {
    let request = await fetch("https://jsonplaceholder.typicode.com/users");
    let response = await request.json();
    console.log(response);
  };

  getUsers();

  return <div className="App"></div>;
}

export default App;
