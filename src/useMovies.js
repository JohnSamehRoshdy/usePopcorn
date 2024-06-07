import { useState, useEffect } from "react";
const KEY = "a6c56464";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();
      async function fetchData() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Error happened while fetching data");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie Not Found");

          setMovies(data.Search);
        } catch (err) {
          // console.log(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchData();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
