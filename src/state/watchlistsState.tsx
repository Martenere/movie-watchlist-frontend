import { atom } from "jotai";

const watchlistUrlAtom = atom("http://localhost:3000/watchlists");

export interface watchlistData {
  id: string | number;
  user: string;
  userId: number;
  name: string;
  description: string;

  movies: number[];
}

export const watchlistsFromApiAtom = atom(async (get) => {
  return getWatchlistDataFromApi(get(watchlistUrlAtom));
});

async function getWatchlistDataFromApi(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
    console.log("Error when fetching watchlist: ", error);
  }
}

// TODO, rely on atoms to store data
// export function createMovieInfoAtom(movieId: number) {
//   const movieIdAtom = atom(movieId);
//   return atom(async (get) => getMovieByID(get(movieIdAtom)));
// }

// async function getMovieByID(id: number) {
//   const url = "https://api.themoviedb.org/3/movie/" + id + "?language=en-US";
//   const tmdb_api_read_key = import.meta.env.VITE_TMDB_API_READ_KEY;
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: "Bearer " + tmdb_api_read_key,
//     },
//   };

//   try {
//     const res = await fetch(url, options);
//     const data = await res.json();
//     return transformMovieData(data);
//   } catch (error) {
//     console.log("Error fetching movie data: ", error);
//   }
// }
