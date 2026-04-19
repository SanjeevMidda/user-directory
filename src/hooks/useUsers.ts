import { useEffect, useState } from "react";
import type { User } from "../types/user";

export const useUsers = (search: string) => {
  // store user data
  const [userData, setUserData] = useState<User[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  // fetch data from API
  useEffect(() => {
    // if (!debouncedSearch) return;

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

  return { userData, status };
};
