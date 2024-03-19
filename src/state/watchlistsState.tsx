import { atom } from "jotai";
import { transformMovieData } from "../components/pages/MovieSearchPage/MovieCardList";
import { BASE_URL } from "../../utils/globalVariables";

const watchlistUrlAtom = atom(BASE_URL + "/watchlists");

export interface WatchlistData {
  id: string | number;
  user: string;
  userId: number;
  name: string;
  description: string;
  movies: number[];
}

export interface ApiWatchlistData {
  id: string | number;
  user: string;
  userId: number;
  name: string;
  description: string;
  movieIDs: number[];
}

const translateData = (ApiData: ApiWatchlistData): WatchlistData => {
  return {
    id: ApiData.id,
    user: ApiData.user,
    userId: ApiData.userId,
    name: ApiData.name,
    description: ApiData.description,
    movies: ApiData.movieIDs,
  };
};

export const watchlistsFromApiAtom = atom(async (get) => {
  get(refetchWatchlistTriggerAtom);
  return getWatchlistDataFromApi(get(watchlistUrlAtom));
});

export const refetchWatchlistTriggerAtom = atom(0);
export const triggerRefetchAtom = atom(null, (get, set) => {
  const count = get(refetchWatchlistTriggerAtom);
  set(refetchWatchlistTriggerAtom, count + 1);
});

async function getWatchlistDataFromApi(url: string) {
  try {
    const res = await fetch(url);
    const returnData = await res.json();
    console.log(returnData);
    const data = returnData.map(translateData);
    console.log(data);
    return data;
  } catch (error) {
    return [];
    console.log("Error when fetching watchlist: ", error);
  }
}
